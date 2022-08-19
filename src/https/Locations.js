import api from "./api";

export const createSavedLocation = async ({ accessToken, ...body }) => {
	const config = {
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data } = await api.post("/savedlocations/", body, config);
	console.log(data, "create");
	return data;
};

export const deleteSavedLocation = async ({ accessToken, id, place_id }) => {
	const config = {
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data } = await api.delete(
		`/savedlocations/?User=${id}&place_id=${place_id}`,
		config
	);
	console.log(data, "delete");
	return data;
};

export const getSavedLocations = async ({ accessToken, id }) => {
	const config = {
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data } = await api.get(`savedlocations/?User=${id}`, config);
	console.log(data, "get saved");
	return data;
};
