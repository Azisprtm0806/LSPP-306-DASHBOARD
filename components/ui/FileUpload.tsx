"use client";
import { Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  placeholder: string;
}

export default function FileUpload({ label, placeholder }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative group">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-white group-hover:border-[#82B124] transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#82B124]/10">
              <Upload className="h-4 w-4 text-gray-400 group-hover:text-[#82B124]" />
            </div>
            <span className="text-sm text-gray-400 truncate">
              {placeholder}
            </span>
          </div>
          <span className="text-xs text-[#82B124] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Pilih File
          </span>
        </div>
      </div>
    </div>
  );
}
