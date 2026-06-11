import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

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

<div className="min-h-screen min-h-[100dvh] bg-[#0f172a] relative overflow-hidden ambient-glow">

    <div className="max-w-[400px] mx-auto px-5 pt-5 pb-28">

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7"
            >

                <h1 className="text-white text-[28px] font-extrabold tracking-[-0.5px]">

                    Submit Compliance

                </h1>

                <p className="text-white/40 mt-1 text-[14px]">

                    Upload your compliance document

                </p>

            </motion.div>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="
                    bg-white/[0.05]
                    backdrop-blur-2xl
                    border
                    border-white/[0.08]
                    rounded-[22px]
                    p-6
                    shadow-[0_8px_40px_rgba(0,0,0,0.35)]
                "
            >

                {/* Remarks */}
                <div className="mb-5">

                    <label className="block text-white/50 text-[12px] font-semibold uppercase tracking-[0.08em] mb-2 ml-1">

                        Remarks

                    </label>

                    <textarea
                        rows="4"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Add any notes or remarks"
                        className="
                            w-full
                            rounded-[14px]
                            p-4
                            bg-white/[0.07]
                            border
                            border-white/[0.1]
                            text-white
                            text-[16px]
                            placeholder-white/30
                            transition-all
                            duration-200
                            resize-vertical
                            min-h-[100px]
                            focus:bg-white/[0.10]
                            focus:border-[rgba(249,115,22,0.5)]
                            focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]
                        "
                    />

                </div>

                {/* Upload */}
                <div className="mb-6">

                    <label className="block text-white/50 text-[12px] font-semibold uppercase tracking-[0.08em] mb-2 ml-1">

                        Upload File

                    </label>

                    <div
                        className="
                            mt-3
                            border-[1.5px]
                            border-dashed
                            border-white/[0.15]
                            rounded-[16px]
                            p-7
                            text-center
                            cursor-pointer
                            transition-all
                            duration-200
                            hover:border-[rgba(249,115,22,0.4)]
                            hover:bg-[rgba(249,115,22,0.04)]
                            active:scale-[0.98]
                        "
                    >

                        <Upload
                            className="
                                mx-auto
                                text-white/30
                                mb-3
                            "
                            size={32}
                        />

                        <p className="text-white/40 text-[14px] font-medium">

                            Tap to select a file

                        </p>

                        <p className="text-white/25 text-[12px] mt-1">

                            PDF, DOC, DOCX, JPG, PNG

                        </p>

                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{ position: 'relative' }}
                        />

                    </div>

                    {
                        file && (

                            <div
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-2.5
                                    text-[#4ade80]
                                    text-[14px]
                                    font-medium
                                    p-3
                                    bg-[rgba(34,197,94,0.08)]
                                    rounded-[12px]
                                    border
                                    border-[rgba(34,197,94,0.15)]
                                "
                            >

                                <div className="w-8 h-8 rounded-[8px] bg-[rgba(34,197,94,0.15)] flex items-center justify-center flex-shrink-0">
                                    <FileText size={16} />
                                </div>

                                <span className="truncate flex-1">{file.name}</span>

                                <svg className="w-4 h-4 text-[#4ade80] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>

                            </div>

                        )
                    }

                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        w-full
                        py-[16px]
                        rounded-[16px]
                        font-bold
                        text-[16px]
                        text-white
                        tracking-[0.02em]
                        transition-all
                        duration-200
                        shadow-[0_4px_16px_rgba(249,115,22,0.35)]
                        relative
                        overflow-hidden
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        active:scale-[0.97]
                        active:shadow-[0_2px_8px_rgba(249,115,22,0.25)]
                        bg-gradient-to-br from-[#f97316] to-[#ea580c]
                    "
                >
                    <span className="relative z-10">

                        {
                            loading
                                ? "Uploading..."
                                : "Submit Compliance"
                        }

                    </span>
                </button>

            </motion.div>

        </div>

    </div>
);

}
