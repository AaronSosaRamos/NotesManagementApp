"use client";
import Notes from "@/components/notes/Notes";
import Navbar from "@/components/template/Navbar";
import Footer from "@/components/template/Footer";
import { useAuth } from "@/lib/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function NotesHome() {

  useAuth();

  return (
    <>
      <Navbar />
      <Notes />
      <Footer />
      <ToastContainer />
    </>
  );
}
