import httpService from "./http.service";
const professionEndpoint = "profession/";

const proffesionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    }
};

export default proffesionService;
