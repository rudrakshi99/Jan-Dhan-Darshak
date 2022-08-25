import api from "./api";

export const createFeedback = async (body) => {
	console.log(body, "body feedback");
	const { data } = await api.post("/feedback/developer", body);
	console.log(data, "feedback");
	return data;
};

export const getFinancialPoints = async () => {
	const { data } = await api.get("/feedback/financial-list");
	return data;
};

export const createFinancialPoint = async ({ accessToken, ...body }) => {
	console.log(body, "financial point");
	let form = new FormData();
	form.append("financial_type", body.financial_type);
	form.append("financial_point_name", body.financial_point_name);
	form.append("unique_id_type", body.unique_id_type);
	form.append("message", body.message);
	form.append("unique_id", body.unique_id);
	form.append("audio_message", {
		uri: body.audio_message,
		name: "hello",
		type: "audio/m4a",
	});
	const config = {
		headers: {
			"content-type": "multipart/form-data",
			authorization: `Bearer ${accessToken}`,
		},
	};
	const { data } = await api.post("/feedback/financial", form, config);
	console.log(data, "financial point");
	return data;
};
