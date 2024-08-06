"use client";
import ArchivedNotes from "@/components/archived-notes/ArchivedNotes";
import Navbar from "@/components/template/Navbar";
import Footer from "@/components/template/Footer";
import { useAuth } from "@/lib/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function ArchivedNotesPage() {

  useAuth();

  return (
    <>
      <Navbar />
      <ArchivedNotes />
      <Footer />
      <ToastContainer />
    </>
  );
}
