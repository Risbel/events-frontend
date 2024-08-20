import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ExampleForm = () => {
  const { register, handleSubmit } = useForm();
  const [years, setYears] = useState(["2022", "2023", "2024", "2025"]);

  // useEffect(() => {
  //   // Supongamos que este es el endpoint desde donde obtienes los años
  //   axios.get('/api/years')
  //     .then(response => {
  //       setYears(response.data.years);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching years:', error);
  //     });
  // }, []);

  const onSubmit = (data: any) => {
    console.log(data.years);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {years.map((year) => (
        <div key={year}>
          <label>
            <input type="checkbox" value={year} {...register("years")} />
            {year}
          </label>
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ExampleForm;
