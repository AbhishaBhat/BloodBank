import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment'

const HomePage = () => {
  const [data,setData] = useState([]);
  const { loading, error,user } = useSelector((state) => state.auth);
  const isHospital = user?.role === "hospital";
  const isDonor = user?.role === "donar";
  const isAdmin = user?.role === "admin";

  const getBloodRecords= async()=>{
    try {
      const {data} = await API.get('/inventory/get-inventory');
      if(data?.success){
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords();
  },[])

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="container mt-3">
            <h3>
              {isAdmin
                ? "Global Blood Inventory"
                : isHospital
                ? "Hospital Blood Requests"
                : "Donor Blood Donations"}
            </h3>
            <p className="text-muted">
              {isAdmin
                ? "Monitor all donation and hospital request records."
                : isHospital
                ? "Request available blood stock and track your hospital usage."
                : "Add donated blood stock and track your donation records."}
            </p>
          </div>

          {(user?.role === "donar" || user?.role === "hospital") && (
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-regular fa-square-plus text-success py-4"></i>
              &nbsp;{user?.role === "hospital" ? "Request Blood" : "Add Blood Donation"}
            </h4>
          )}

            <div className="container m-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">{isHospital ? "Hospital Email" : isDonor ? "Donor Email" : "User Email"}</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record)=>(
                  <tr className={(record.inventoryType.toLowerCase() === 'in') ? 'table-success' : 'table-danger'} key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType.toUpperCase()}</td>
                    <td>{record.quantity} ml</td>
                    <td>{record.email}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>


          {(user?.role === "donar" || user?.role === "hospital") && <Modal />}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
