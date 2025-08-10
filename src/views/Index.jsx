/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import Best_Element from "./Best_Element";
import CARS_DATA from "./examples/CARS_DATA.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const weight = {
    cena: 1,
    przebieg: 1,
    klimatyzacja: 1,
    sredni_koszt_naprawy: 1,
  };
  const [cars, setCars] = useState(CARS_DATA.samochody);
  const [producers, setProducers] = useState(CARS_DATA.producer);
  const [producersPercentage, setProducersPercentage] = useState();

  const countProducers = () => {
    let count = {};
    cars.map((car) => {
      const producer = CARS_DATA.producer[car.producer_id - 1];
      console.log(producer);
      if (count[producer]) {
        count[producer]++;
      } else {
        count[producer] = 1;
      }
    });
    console.log(count);
    return count;
  }
  const producerCount = countProducers();

  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [isASC, setIsASC] = useState({
    ID: "ASC",
    name: "ASC",
    cena: "ASC",
    przebieg: "ASC",
    klimatyzacja: "ASC",
    sredni_koszt_naprawy: "ASC",
    producer: "ASC",
  });
  const [bestCar, setBestCar] = useState("");
  const [bestProducer, setBestProducer] = useState("");
  const sorted = [
    { cena: 50 },
    { przebieg: 50 },
    { klimatyzacja: 50 },
    { sredni_koszt_naprawy: 50 },
  ];

  const [opened, setOpened] = useState([false, false, false, false]);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [courseMin, setCourseMin] = useState(0);
  const [courseMax, setCourseMax] = useState(0);
  const [repairMin, setRepairMin] = useState(0);
  const [repairMax, setRepairMax] = useState(0);
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);
  const [courseRange, setCourseRange] = useState([courseMin, courseMax]);
  const [repairRange, setRepairRange] = useState([priceMin, priceMax]);
  const [filteredCars, setFilteredCars] = useState(cars);

  const minDistance = 10;

  const toggleSortingOrder = (columnName) => {
    const currentOrder = isASC[columnName];
    const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
    setIsASC({ ...isASC, [columnName]: newOrder });
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index, openedIndex = "") => {
    if (e !== "") {
      e.preventDefault();
    }
    const newOpened = [...opened];
    if (openedIndex !== "") {
      newOpened[openedIndex] = !newOpened[openedIndex];
      setOpened(newOpened);
    }
    if (index === 1) {
      setOpened([false, false, false, false]);
    }
    setActiveNav(index);
  };

  const UpdateCharts = (index) => {
    let new_filtered_cars = filteredCars;

    if (Array.isArray(filteredCars) && filteredCars.length !== 0) {
      new_filtered_cars = new_filtered_cars.map((car) => {
        const modifiedCar = JSON.parse(JSON.stringify(car));
        if (!opened[0]) {
          delete modifiedCar["cena"];
        }
        if (!opened[1]) {
          delete modifiedCar["przebieg"];
        }
        if (!opened[2]) {
          delete modifiedCar["klimatyzacja"];
        }
        if (!opened[3]) {
          delete modifiedCar["sredni_koszt_naprawy"];
        }
        return modifiedCar;
      });
    }

    const test = new Best_Element();
    let results = [];
    if (filteredCars.length > 0) {
      if (index === 1) {
        results = test.onLoad(filteredCars, weight, sorted).winning_data;
      } else {
        results = test.onLoad(new_filtered_cars, weight, sorted).winning_data;
      }
      setBestCar(results[0].name);

      let names = [];
      let sum = [];
      let prices = [];
      let km = [];
      let AC = [];
      let repair = [];
      results.map((element) => {
        names.push(element.name);
        sum.push(element.sum);
        prices.push(element.cena);
        km.push(element.przebieg);
        AC.push(element.klimatyzacja);
        repair.push(element.sredni_koszt_naprawy);
        return null;
      });
      let chart1Data = {};
      let chart2Data = {};

      chart1Data = {
        labels: names,
        datasets: [
          {
            label: "Sum",
            data: sum,
            borderColor: "rgba(255, 255, 255, 0.65)",
          },
          {
            label: "Price",
            data: prices,
            borderColor: "rgba(255, 0, 141, 0.65)",
          },
          {
            label: "Course",
            data: km,
            borderColor: "rgba(255, 119, 0, 0.65)",
          },
          {
            label: "Air Conditioning",
            data: AC,
            borderColor: "rgba(248, 255, 0, 0.65)",
          },
          {
            label: "Repair Price",
            data: repair,
            borderColor: "rgba(17, 205, 239, 0.65)",
          },
        ],
      };

      let producent = [];
      let producentSum = [];
      let producent_result = [];


      results.map((element) => {
        producentSum[element.producer_id] = 0;
        producent[element.producer_id] = 0;
        return null;
      });
      results.map((element) => {
        producentSum[element.producer_id] += element.sum;
        producent[element.producer_id]++;
        return null;
      });

      for (const brand in producent) {
        if (producent.hasOwnProperty(brand) && producentSum.hasOwnProperty(brand)) {
          producent_result.push({
            name: CARS_DATA.producer[brand - 1],
            sum: producentSum[brand] / producent[brand],
          });
        }
      }

      console.log(producent);
      console.log(producent_result);

      
      producent_result.sort((a, b) => b.sum - a.sum);
      setBestProducer(producent_result[0].name);
      let chartProducer = producent_result.slice(0, 6);

      chart2Data = {
        labels: chartProducer.map((element) => element.name),
        datasets: [
          {
            label: "Sales",
            data: chartProducer.map((element) => element.sum),
            maxBarThickness: 10,
          },
        ],
      };

      chartExample1.data1 = (canvas) => chart1Data;
      setLineData(chart1Data);

      chartExample2.data2 = (canvas) => chart2Data;
      setBarData(chart2Data);
    } else {
      setBestCar("no car matches your preferences");
    }
  };

  const minMax = () => {
    let maxPrice = 0;
    let maxCourse = 0;
    let maxRepair = 0;
    cars.map((element) => {
      if (element.cena > maxPrice) {
        maxPrice = element.cena;
      }
      if (element.przebieg > maxCourse) {
        maxCourse = element.przebieg;
      }
      if (element.sredni_koszt_naprawy > maxRepair) {
        maxRepair = element.sredni_koszt_naprawy;
      }
      return null;
    });
    let minPrice = maxPrice;
    let minCourse = maxCourse;
    let minRepair = maxRepair;
    cars.map((element) => {
      if (element.cena < minPrice) {
        minPrice = element.cena;
      }
      if (element.przebieg < minCourse) {
        minCourse = element.przebieg;
      }
      if (element.sredni_koszt_naprawy < minRepair) {
        minRepair = element.sredni_koszt_naprawy;
      }
      return null;
    });

    setPriceMin(minPrice);
    setPriceMax(maxPrice);
    setPriceRange([minPrice, maxPrice]);

    setCourseMin(minCourse);
    setCourseMax(maxCourse);
    setCourseRange([minCourse, maxCourse]);

    setRepairMin(minRepair);
    setRepairMax(maxRepair);
    setRepairRange([minRepair, maxRepair]);
  };

  const refreashData = (code = "", direction = "") => {
    setCars(CARS_DATA);
  };

  const refreashProducers = () => {
    let link = `http://localhost:3040/producent`;

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        let sum = 0;
        setProducers(data);
        data.map((element) => {
          sum += element.counted;
          return null;
        });
        setProducersPercentage(sum);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleNewSliderChange = (event, newValue, activeThumb, type) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (type === 1) {
      if (activeThumb === 0) {
        setPriceRange([
          Math.min(newValue[0], priceRange[1] - minDistance),
          priceRange[1],
        ]);
      } else {
        setPriceRange([
          priceRange[0],
          Math.max(newValue[1], priceRange[0] + minDistance),
        ]);
      }
    }
    if (type === 2) {
      if (activeThumb === 0) {
        setCourseRange([
          Math.min(newValue[0], courseRange[1] - minDistance),
          courseRange[1],
        ]);
      } else {
        setCourseRange([
          courseRange[0],
          Math.max(newValue[1], courseRange[0] + minDistance),
        ]);
      }
    }
    if (type === 3) {
      if (activeThumb === 0) {
        setRepairRange([
          Math.min(newValue[0], repairRange[1] - minDistance),
          repairRange[1],
        ]);
      } else {
        setRepairRange([
          repairRange[0],
          Math.max(newValue[1], repairRange[0] + minDistance),
        ]);
      }
    }
    filterCars();
  };

  const filterCars = () => {
    let new_car_data = cars.filter(
      (car) =>
        car.cena >= priceRange[0] &&
        car.cena <= priceRange[1] &&
        car.przebieg >= courseRange[0] &&
        car.przebieg <= courseRange[1] &&
        car.sredni_koszt_naprawy >= repairRange[0] &&
        car.sredni_koszt_naprawy <= repairRange[1]
    );
    setFilteredCars(new_car_data);
    UpdateCharts(activeNav, new_car_data);
  };

  useEffect(() => {
    document.title = "REACT RISK CALCULATOR";
    minMax();
  }, []);

  useEffect(() => {
    UpdateCharts(activeNav);
  }, [cars, opened, activeNav]);

  useEffect(() => {
    if (Array.isArray(cars) && cars.length > 0) {
      filterCars();
    }
  }, [cars]);

  return (
    <>
      <Header
        UpdateCharts={UpdateCharts}
        priceMin={priceMin}
        priceMax={priceMax}
        courseMin={courseMin}
        courseMax={courseMax}
        repairMin={repairMin}
        repairMax={repairMax}
        priceRange={priceRange}
        courseRange={courseRange}
        repairRange={repairRange}
        handleNewSliderChange={handleNewSliderChange}
        index={true}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      {"Cars matching your preferences: " + filteredCars.length}
                    </h6>
                    <h2 className="text-white mb-0">
                      {bestCar === "no car matches your preferences"
                        ? bestCar
                        : "Best option: " + bestCar}
                    </h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end">
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                          style={{
                            color: activeNav === 1 ? "#5e72e4" : "#525f7f",
                            ":hover": "#5e72e4",
                          }}
                        >
                          <span className="d-none d-md-block">All</span>
                          <span className="d-md-none">All</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          href="#pablo"
                          onClick={(e) => {
                            toggleNavs(e, 2, 0);
                          }}
                          style={{ color: opened[0] ? "#5e72e4" : "#525f7f" }}
                        >
                          <span className="d-none d-md-block">Price</span>
                          <span className="d-md-none">$</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => {
                            toggleNavs(e, 2, 1);
                          }}
                          style={{ color: opened[1] ? "#5e72e4" : "#525f7f" }}
                        >
                          <span className="d-none d-md-block">km</span>
                          <span className="d-md-none">km</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => {
                            toggleNavs(e, 2, 2);
                          }}
                          style={{ color: opened[2] ? "#5e72e4" : "#525f7f" }}
                        >
                          <span className="d-none d-md-block">AC</span>
                          <span className="d-md-none">AC</span>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => {
                            toggleNavs(e, 2, 3);
                          }}
                          style={{ color: opened[3] ? "#5e72e4" : "#525f7f" }}
                        >
                          <span className="d-none d-md-block">AVG</span>
                          <span className="d-md-none">AVG</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={lineData}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(cars)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Average Car points per brand
                    </h6>
                    <h2 className="mb-0">{bestProducer}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar data={barData} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Cars</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        refreashData();
                      }}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col" onClick={() =>(refreashData("ID", isASC["ID"]), toggleSortingOrder("ID"))}>ID</th> */}
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData("name", isASC["name"]);
                        toggleSortingOrder("name");
                      }}
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData("cena", isASC["cena"]);
                        toggleSortingOrder("cena");
                      }}
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData("przebieg", isASC["przebieg"]);
                        toggleSortingOrder("przebieg");
                      }}
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData("klimatyzacja", isASC["klimatyzacja"]);
                        toggleSortingOrder("klimatyzacja");
                      }}
                    >
                      AC
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData(
                          "sredni_koszt_naprawy",
                          isASC["sredni_koszt_naprawy"]
                        );
                        toggleSortingOrder("sredni_koszt_naprawy");
                      }}
                    >
                      Avg repair cost
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        refreashData("producer", isASC["producer"]);
                        toggleSortingOrder("producer");
                      }}
                    >
                      Producer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(cars) &&
                    cars.map((element, index) => {
                      return (
                        <tr key={"tr" + element.name + " " + index}>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row" key={"td" + "name" + index}>
                            {element.name}
                          </th>
                          <td key={"td" + "cena" + index}>{element.cena}</td>
                          <td key={"td" + "przebieg" + index}>
                            {element.przebieg}
                          </td>
                          <td key={"td" + "klimatyzacja" + index}>
                            {element.klimatyzacja}
                          </td>
                          <td key={"td" + "sredni_koszt_naprawy" + index}>
                            {element.sredni_koszt_naprawy}
                          </td>
                          <td key={"td" + "producer" + index}>
                            {CARS_DATA.producer[element.producer_id - 1]}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Producers</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Producer</th>
                    <th scope="col">cars</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(producers) &&
                    producers.map((element) => {
                      return (
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element}</th>
                          <td>{producerCount[element]}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">
                                {(
                                  (producerCount[element] / cars.length) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                              <div>
                                <Progress
                                  max="100"
                                  value={(
                                    (producerCount[element] / cars.length) *
                                    100
                                  ).toFixed(1)}
                                  barClassName="bg-gradient-info"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
