const puppeteer = require("puppeteer");

const processTodayPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://weather.com/weather/today/l/3b86f566b0816d03333b72d794a21f368cf6539efd6b5d5273d873ecf1cd2f2c"
  );
  // page.on("console", (consoleObj) => {
  //   if (consoleObj.type() === "log") {
  //     console.log(consoleObj.text());
  //   }
  // });

  // CURRENT CONDITION
  const condition = await page.$eval(
    "[data-testid='wxPhrase']",
    (el) => el.textContent
  );
  // CURRENT TEMPERATURE
  const currentTemperature = await page.$eval(
    "[data-testid='TemperatureValue']",
    (el) => Math.round((parseInt(el.textContent) - 32) * 0.5556) + "°"
  );
  // HIGH - LOW TEMPERATURE
  const [highTemperature, lowTemperature, _] = await page.$$eval(
    "[data-testid='WeatherDetailsListItem'] [data-testid='TemperatureValue']",
    (temps) =>
      temps.map((temp) => {
        if (parseInt(temp.textContent))
          return Math.round((parseInt(temp.textContent) - 32) * 0.5556) + "°";
        else return temp.textContent;
      })
  );
  // HUMIDITY
  const humidity = await page.$eval(
    "[data-testid='TodaysDetailsModule'] [data-testid='PercentageValue']",
    (el) => el.textContent
  );

  // WIND SPEED AND DIRECTION
  const wind = await page.$eval("[data-testid='Wind']", (el) => {
    const windDirectionDeg = parseInt(
      el.childNodes[0].style.transform.match(/\((?<degree>.*)deg\)/).groups[
        "degree"
      ]
    );
    return {
      speed: Math.round(parseInt(el.innerText) * 1.609344) + " kmh",
      // -120 because phosfor icon is at 120degree by default and
      // weather.com rotate their icon from 0
      direction: windDirectionDeg - 120,
    };
  });

  // SUNRISE AND SUNSET TIMES
  const sunrise = await page.$eval(
    "[data-testid='SunriseValue'] p",
    (el) => el.textContent
  );
  const sunset = await page.$eval(
    "[data-testid='SunsetValue'] p",
    (el) => el.textContent
  );

  const currentInfo = {
    condition,
    currentTemperature,
    highTemperature,
    lowTemperature,
    humidity,
    windSpeed: wind.speed,
    windDirection: wind.direction,
    sunsetTime: sunset,
    sunriseTime: sunrise,
  };
  // console.log(currentInfo);
  return currentInfo;
};

export default async function handler(req, res) {
  const todayInfo = await processTodayPage();
  res.status(200).json({ todayInfo });
}
