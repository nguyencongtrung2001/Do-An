"use client";

import { useState, useCallback } from "react";
import { OwnerCourt } from "@/types/court.types";
import { courtService } from "@/services/court.service";
import toast from "react-hot-toast";

export function useOwnerCourtsForm(token: string | null, courts: OwnerCourt[], onRefresh: () => Promise<void>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ duong_dan_anh: string }[]>([]);

  const resetForm = useCallback(() => {
    setFormData({ name: "", type: "", price: "" });
    setEditingId(null);
    setSelectedFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setExistingImages([]);
  }, [previewUrls]);

  const openModal = (mode: "add" | "edit", id?: string) => {
    resetForm();
    setModalMode(mode);
    if (mode === "edit" && id) {
      const court = courts.find(c => c.ma_san === id);
      if (court) {
        setFormData({
          name: court.ten_san,
          type: court.loai_the_thao,
          price: court.gia_thue_30p.toString(),
        });
        setEditingId(id);
        setExistingImages(court.anhsan || []);
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles(files);
    setPreviewUrls(files.map(f => URL.createObjectURL(f)));
    
    if (modalMode === "edit") {
      setExistingImages([]);
    }
  };

  const removeSelectedFile = (idx: number) => {
    URL.revokeObjectURL(previewUrls[idx]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const removeExistingImage = (idx: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("ten_san", formData.name);
      fd.append("loai_the_thao", formData.type);
      fd.append("gia_thue_30p", formData.price);
      selectedFiles.forEach(file => fd.append("images", file));

      if (modalMode === "edit" && editingId) {
        await courtService.updateCourt(token, editingId, fd as any);
        toast.success("Cập nhật sân thành công!");
      } else {
        await courtService.addCourt(token, fd);
        toast.success("Thêm sân mới thành công!");
      }

      await onRefresh();
      closeModal();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi lưu.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    isModalOpen,
    modalMode,
    submitting,
    formData,
    setFormData,
    selectedFiles,
    previewUrls,
    existingImages,
    openModal,
    closeModal,
    handleFilesChange,
    removeSelectedFile,
    removeExistingImage,
    handleSubmit,
  };
}
