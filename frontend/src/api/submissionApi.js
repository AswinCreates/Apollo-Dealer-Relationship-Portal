import axios from "axios";

const API = axios.create({
baseURL: "http://localhost:8080/api"
});

export const uploadSubmission = (
assignmentId,
remarks,
file
) => {

const formData = new FormData();

formData.append(
    "assignmentId",
    assignmentId
);

formData.append(
    "remarks",
    remarks
);

formData.append(
    "file",
    file
);

return API.post(
    "/submissions/upload",
    formData,
    {
        headers: {
            "Content-Type":
                "multipart/form-data"
        }
    }
);

};

export default API;
