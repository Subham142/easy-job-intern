import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import "../Internships/AllInternships.css";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/user/all-jobs",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
          // alert(res.data.error);
          const notify = () => toast(res.data.error);
          notify();
        } else {
          console.log(res.data.jobs);
          setJobs(res.data.jobs);
          console.log(jobs);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  if (jobs && jobs[4]) {
    console.log(jobs[4]);
    const t = new Date(jobs[4].startDate).toString("YYYY-MM-DD");
    console.log(t);
  }

  const GettingMonth = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const time =
      monthNames[new Date(date).getMonth()] +
      ", " +
      new Date(date).getFullYear();
    return time;
  };

  const GettingDate = (date) => {
    const time = new Date(date).getDate() + " " + GettingMonth(date);
    return time;
  };


  return (
    <div className="internshipsOuterContainer">
     <Toaster />
      <Row className="justify-content-xl-start justify-content-lg-around justify-content-sm-center">
        {jobs &&
          jobs.map((job) => {
            return (
              <Col
                key={job._id}
                className="col-xl-4 col-lg-5 col-md-6 col-sm-11 col-12 colPost"
              >
                <Card className="cardPost">
                  <Card.Body>
                    <Card.Title className="titleOfPost">
                      {job.companyName}
                    </Card.Title>
                    <Card.Subtitle className="subtitleOfPost">
                      {job.location}
                    </Card.Subtitle>
                    <Card.Text className="textPost">
                      {job.description}
                    </Card.Text>
                    <ListGroup>
                      <ListGroupItem className="itemPost">
                        Salary: {job.salary}
                      </ListGroupItem>
                      <ListGroupItem className="itemPost">
                        Work Experience: {job.experience && "Atleast"} {job.experience} {job.experience===1 && "year"} {job.experience>1 && "years"}
                      </ListGroupItem>
                      <ListGroupItem className="itemPost">
                        Start Date: {GettingMonth(job.startDate)}
                      </ListGroupItem>
                      <ListGroupItem className="itemPost last">
                        Last Date to Apply: {GettingDate(job.lastDate)}
                      </ListGroupItem>
                    </ListGroup>
                    <div className="tech">
                      {job.techstack &&
                        job.techstack.map((skill, i) => (
                          <Card.Link key={i} className="TechStack">
                            {skill}
                          </Card.Link>
                        ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
export default AllJobs;
