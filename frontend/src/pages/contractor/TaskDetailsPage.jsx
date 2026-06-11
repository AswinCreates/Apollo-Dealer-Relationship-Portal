import { useState } from "react";
import { useParams } from "react-router-dom";

import {
Upload,
FileText
} from "lucide-react";

import { uploadSubmission }
from "../../api/submissionApi";

export default function TaskDetailsPage() {

const { id } = useParams();

const [remarks, setRemarks] =
    useState("");

const [file, setFile] =
    useState(null);

const [loading, setLoading] =
    useState(false);

const handleSubmit = async () => {

    if (!file) {

        alert(
            "Please select a document"
        );

        return;
    }

    try {

        setLoading(true);

        await uploadSubmission(
            id,
            remarks,
            file
        );

        alert(
            "Compliance submitted successfully"
        );

        setRemarks("");
        setFile(null);

    } catch (error) {

        console.error(error);

        alert(
            "Upload Failed"
        );

    } finally {

        setLoading(false);
    }
};

return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5">

        <div className="max-w-md mx-auto">

            <h1 className="text-white text-3xl font-bold mb-6">

                Submit Compliance

            </h1>

            <div
                className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-3xl
                p-5
            "
            >

                <div className="mb-5">

                    <label className="text-white">

                        Remarks

                    </label>

                    <textarea
                        rows="4"
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(
                                e.target.value
                            )
                        }
                        className="
                        mt-2
                        w-full
                        rounded-xl
                        p-3
                        bg-white/10
                        border
                        border-white/20
                        text-white
                    "
                    />

                </div>

                <div className="mb-6">

                    <label className="text-white">

                        Upload File

                    </label>

                    <div
                        className="
                        mt-3
                        border-2
                        border-dashed
                        border-white/20
                        rounded-2xl
                        p-5
                        text-center
                    "
                    >

                        <Upload
                            className="
                            mx-auto
                            text-white
                            mb-3
                        "
                        />

                        <input
                            type="file"
                            onChange={(e) =>
                                setFile(
                                    e.target.files[0]
                                )
                            }
                            className="
                            text-white
                        "
                        />

                    </div>

                    {
                        file && (

                            <div
                                className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                text-green-400
                            "
                            >

                                <FileText
                                    size={18}
                                />

                                {file.name}

                            </div>

                        )
                    }

                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                    w-full
                    bg-orange-500
                    hover:bg-orange-600
                    transition
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                "
                >

                    {
                        loading
                            ? "Uploading..."
                            : "Submit Compliance"
                    }

                </button>

            </div>

        </div>

    </div>
);

}
