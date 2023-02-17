const handler = async (req, res) => {
  const levelsRes = await fetch(
    "https://weather-info-db-default-rtdb.europe-west1.firebasedatabase.app/levels.json"
  );
  if (!levelsRes.ok) console.log(`ERROR FETCH LEVELS: ${levelsRes.status}`);
  res.status(200).json(await levelsRes.json());
};
export default handler;
