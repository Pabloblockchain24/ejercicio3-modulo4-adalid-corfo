import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const response = await fetch("/assets/data/doctores.json");
        const doctores = await response.json();       
        setDoctors(doctores);
      } catch (error) {
        console.error("Error al cargar los doctores:", error);
      }
    }
    loadDoctors();
  }, []);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/assets/data/servicios_medicos.json");
        const servicios_medicos = await response.json();
        setServices(servicios_medicos);
      } catch (error) {
        console.error("Error al cargar los servicios :", error);
      }
    }
    loadServices();
  }, []);

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <DataContext.Provider
      value={{ doctors, services, addAppointment, appointments }}
    >
      {children}
    </DataContext.Provider>
  );
}
