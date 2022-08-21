import axios from "axios";

const IP_NF = "https://ip.nf/me.json";

const getUserCountry = async (): Promise<{
  countryCode: string;
  country: string;
}> => {
  const location = await axios(IP_NF);
  const { country_code: countryCode, country } = location?.data.ip;
  return { countryCode, country };
};

export default getUserCountry;
