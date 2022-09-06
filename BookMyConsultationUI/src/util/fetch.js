import React, {useState } from "react";

export async function getDoctorList(setDoctorList) {
    try {
        var url = "http://localhost:8080/doctors";
        const rawresponse = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                }
            })
        if (rawresponse.ok) {
            const fetchedDoctorList = await rawresponse.json();
            setDoctorList(fetchedDoctorList);
        }
        else {
            const errorback = await rawresponse.json();
            const error = new Error(errorback.message);
            throw error;
        }
    } catch (e) {
        alert(e.message);
    }
}
export async function getDoctorListByFilter(selectedSpeciality,setDoctorList) {
    try {
        var url = "http://localhost:8080/doctors?speciality=" + selectedSpeciality;
        const rawresponse = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                }
            })
        if (rawresponse.ok) {
            const fetchedDoctorList = await rawresponse.json();
            setDoctorList(fetchedDoctorList);
        }
        else {
            const errorback = await rawresponse.json();
            const error = new Error(errorback.message);
            throw error;
        }
    } catch (e) {
        alert(e.message);
    }
}
export async function getSpecialityList(setSpecialityList) {
    try {
        var url = "http://localhost:8080/doctors/speciality";
        const rawresponse = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                }
            })
        if (rawresponse.ok) {
            const fetchedSpeciality = await rawresponse.json();
            setSpecialityList(fetchedSpeciality);
        }
        else {
            const errorback = await rawresponse.json();
            const error = new Error(errorback.message);
            throw error;
        }
    } catch (e) {
        alert(e.message);
    }
}