const puppeteer = require("puppeteer");

// Had to do it this way because puppeteer has weird requirement for args passed to $$eval
const getMainDetails = async (page) => {
  return await page.evaluateHandle(() => {
    return async (element) => {
      let temperature, condition, precip, wind;
      const regTemp = new RegExp(".*temperature.*");
      const regCondition = new RegExp(".*condition.*");
      const regPrecip = new RegExp(".*precip.*");
      const regWind = new RegExp(".*wind.*");

      const elementsDOM = element.querySelectorAll("div");
      //time
      const time = element.querySelector("h3").innerText;
      for (el of elementsDOM) {
        const spanText = el.querySelector("span").innerText;
        // temperature
        if (regTemp.test(el.classList))
          temperature = Math.round((parseInt(spanText) - 32) * 0.5556) + "°";
        // precip
        if (regPrecip.test(el.classList)) precip = spanText;
        // wind
        if (regWind.test(el.classList)) {
          const [direction, windSpeedMPH, _] = spanText.split(" ");
          const windSpeedKMH = Math.round(Number(windSpeedMPH) * 1.609344);
          wind = `${direction} ${windSpeedKMH} kmh`;
        }
        // weather condition
        if (regCondition.test(el.classList)) condition = spanText;
      }
      return {
        time,
        temperature,
        condition,
        wind,
        precip,
      };
    };
  });
};

const getAdditionalDetails = async (page) => {
  return await page.evaluateHandle(() => {
    return async (element) => {
      // console.log(element.getAttribute("class"));
      const cloudCover = element.querySelector(
        "[data-testid='CloudCoverSection'] div [data-testid='PercentageValue']"
      ).textContent;

      const humidity = element.querySelector(
        "[data-testid='HumiditySection'] div [data-testid='PercentageValue']"
      ).textContent;

      return {
        cloudCover,
        humidity,
      };
    };
  });
};

const processHourlyPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://weather.com/weather/hourbyhour/l/3b86f566b0816d03333b72d794a21f368cf6539efd6b5d5273d873ecf1cd2f2c"
  );
  const hours = 24;
  // page.on("console", (consoleObj) => {
  //   if (consoleObj.type() === "log") {
  //     console.log(consoleObj.text());
  //   }
  // });

  // select all 1h intervals
  const details = await page.$$eval(
    "section div details",
    async (details, getMainDetails, getAdditionalDetails) => {
      return await Promise.all(
        details.map(async (el) => {
          // for every 1h interval map that element to object
          const elementMain = el.querySelector("summary div div");
          const mainDetails = await getMainDetails(elementMain);
          const elementsAdditional = Array.from(el.querySelectorAll("div"));
          const regDetailsTable = new RegExp("DetailsTable.*");
          let elementDetailTable;
          for (el of elementsAdditional)
            if (regDetailsTable.test(el.classList)) {
              elementDetailTable = el;
              break;
            }
          const additionalDetails = await getAdditionalDetails(
            elementDetailTable
          );
          return { ...mainDetails, ...additionalDetails };
        })
      );
    },
    await getMainDetails(page),
    await getAdditionalDetails(page)
  );
  // console.log(details.slice(0));
  await browser.close();
  return details;
};

export default async function handler(req, res) {
  const hourlyInfo = await processHourlyPage();
  res.status(200).json({ hourlyArray: hourlyInfo });
}
