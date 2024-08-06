"use client";
import Categories from "@/components/categories/Categories";
import Navbar from "@/components/template/Navbar";
import Footer from "@/components/template/Footer";
import { useAuth } from "@/lib/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function CategoriesPage() {

  useAuth();

  return (
    <>
      <Navbar />
      <Categories />
      <Footer />
      <ToastContainer />
    </>
  );
}
