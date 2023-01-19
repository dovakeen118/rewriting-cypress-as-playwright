import axios from "axios";
import { FactoryCreateOptions, HelperCreateOptions } from "./interfaces";
// @ts-check
export const truncateDatabase = async () => {
  return await axios.post("http://localhost:4000/test/truncations", {});
};


export const factoryCreate = async (name, options?: FactoryCreateOptions) => {
  return await axios.post("http://localhost:4000/test/factories", {
    data: { name, ...options },
  });
};

export const helperCreate = async (name, options?: HelperCreateOptions) => {
  return await axios.post("http://localhost:4000/test/helpers", {
    data: { name, ...options },
  });
};

export const featureFlagCreate = async (name) => {
  return await axios.post("http://localhost:4000/test/feature_flags", {
    name,
  });
};

export const featureFlagActorCreate = async ({ flagName, email }) => {
  return await axios.post(
    `http://localhost:4000/test/feature_flags/${flagName}/actors`,
    {
      email,
    }
  );
};