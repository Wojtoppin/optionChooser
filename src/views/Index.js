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
  const [cenaSliderValue, setCenaSliderValue] = useState(50);
  const [przebiegSliderValue, setPrzebiegSliderValue] = useState(50);
  const [klimatyzacjaSliderValue, setKlimatyzacjaSliderValue] = useState(50);
  const [kosztSliderValue, setKosztSliderValue] = useState(50);
  const [activeNav, setActiveNav] = useState(1);
  const [weight, setWeights] = useState({cena:cenaSliderValue, przebieg:przebiegSliderValue, klimatyzacja:klimatyzacjaSliderValue, sredni_koszt_naprawy:kosztSliderValue})
  const [cars, setCars] = useState({})
  const [producers, setProducers] = useState({})
  const [producersPercentage, setProducersPercentage] = useState()
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [isASC, setIsASC] = useState({ID:"ASC", name:"ASC", cena:"ASC", przebieg:"ASC", klimatyzacja:"ASC", sredni_koszt_naprawy:"ASC", producer:"ASC"})
  const [bestCar, setBestCar] = useState("")
  const [bestProducer, setBestProducer] = useState("")
  const [sorted, setSorted] = useState({})
  

  const toggleSortingOrder = (columnName) => {
    const currentOrder = isASC[columnName];
    const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
    setIsASC({ ...isASC, [columnName]: newOrder });
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    UpdateCharts(index)
  };

  function UpdateCharts(index, filteredCars={}) {

    fetch(`http://localhost:3040/data`)
    .then(response => response.json())
    .then(data => {
      const test = new Best_Element();
      let results = []
      while(results.length == 0){
        if(filteredCars.length > 0){
          results = test.onLoad(filteredCars, weight, sorted).winning_data;
        }else{
          results = test.onLoad(data, weight, sorted).winning_data;
        }
      }
      let names = [];
      let sum = [];
      let prices = [];
      let km = [];
      let AC = [];
      let repair = [];
      setBestCar(results[0].name)
      results.map(element =>{
        names.push(element.name);
        sum.push(element.sum);
        prices.push(element.cena);
        km.push(element.przebieg);
        AC.push(element.klimatyzacja);
        repair.push(element.sredni_koszt_naprawy);
      })
      let chart1Data = {};
      let chart2Data = {};
      let new_label="";
      let new_data = [];
      let new_bC = "";
      let selected_array = [];

      if (index === 1){
        chart1Data = {
          labels: names,
          datasets: [
            {
              label: "Sum",
              data: sum,
              borderColor: 'rgba(255, 0, 0, 0.65)',
              
            },
            {
              label: "Price",
              data: prices,
              borderColor: 'rgba(255, 0, 141, 0.65)',
            },
            {
              label: "Course",
              data: km,
              borderColor: 'rgba(255, 119, 0, 0.65)',
            },
            {
              label: "Air Conditioning",
              data: AC,
              borderColor: 'rgba(248, 255, 0, 0.65)',
            },
            {
              label: "Repair Price",
              data: repair,
              borderColor: 'rgba(17, 205, 239, 0.65)',
            },
          ],
        };
        selected_array = sum;
        
      }
      if (index === 2){
        new_label = "Price"
        new_data = prices;
        new_bC = "rgba(255, 0, 141, 0.65)"
        selected_array = prices;

      }
      if (index === 3){
        new_label = "Course"
        new_data = km;
        new_bC = "rgba(255, 119, 0, 0.65)"
        selected_array = km;

      }
      if (index === 4){
        new_label = "Air Conditioning"
        new_data = AC;
        new_bC = 'rgba(248, 255, 0, 0.65)'
        selected_array = AC;

      }
      if (index === 5){
        new_label = "Repair Price"
        new_data = repair;
        new_bC = 'rgba(17, 205, 239, 0.65)'
        selected_array = repair;

      }
      if(Object.keys(chart1Data).length === 0){
        chart1Data = {
          labels: names,
          datasets: [
            {
              label: new_label,
              data: new_data,
              borderColor: new_bC,
            },
          ],
        };
    }


    let producent= [];
    let producentSum = [];
    let producent_result = [];

    results.map(element=>{
      producent_result.push({producer: element.producer, sum: element.sum });
    })

    results.map(element=>{
      producentSum[element.producer]=0;
      producent[element.producer]=0;
    })
    results.map(element=>{
      producentSum[element.producer]+=element.sum;
      producent[element.producer]++;

    })

    producent_result = [];
    for(const brand in producent){
      if (producent.hasOwnProperty(brand) && producentSum.hasOwnProperty(brand)) {
        producent_result.push({name: brand ,sum: producentSum[brand] / producent[brand]})
      }
    }
    producent_result.sort((a, b) => b.sum - a.sum)
    setBestProducer(producent_result[0].name)


    chart2Data = {
      labels: [producent_result[0].name,
        producent_result[1].name,
        producent_result[2].name,
          producent_result[3].name,
          producent_result[4].name,
            producent_result[5].name],
      datasets: [
        {
          label: "Sales",
          data: [producent_result[0].sum,
                  producent_result[1].sum,
                    producent_result[2].sum,
                    producent_result[3].sum,
                      producent_result[4].sum,
                      producent_result[5].sum],
          maxBarThickness: 10,
        },
      ],
    };

    chartExample1.data1 = (canvas) => chart1Data;
    setLineData(chart1Data);
    
    chartExample2.data2 = (canvas) => chart2Data;
    setBarData(chart2Data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    }


  const refreashData = (code="", direction="") =>{
    let link = `http://localhost:3040/data`;
    if(code !== "" && direction !== ""){
        link += `/${direction}/${code}`;
    }
    fetch(link)
    .then(response => response.json())
    .then(data => {

        setCars(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
  }

  const refreashProducers = () =>{
    let link = `http://localhost:3040/producent`;
    
    fetch(link)
    .then(response => response.json())
    .then(data => {
        let sum = 0;
        setProducers(data);
        data.map(element =>{
          sum += element.counted;
        })
        setProducersPercentage(sum);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const handleSliderChange = (event, num) => {
    const newValue = parseInt(event.target.value);
    let new_value = 0;
    let new_cena = 0;
    let new_przebieg = 0;
    let new_klimatyzacja = 0;
    let new_koszt = 0;
    if(newValue !== 0){
      new_value = 101 - newValue;
    }
    if (cenaSliderValue !== 0){
      new_cena = 101-cenaSliderValue;
    }
    if (przebiegSliderValue !== 0){
      new_przebieg = 101-przebiegSliderValue;
    }
    if (klimatyzacjaSliderValue !== 0){
      new_klimatyzacja = 101-klimatyzacjaSliderValue;
    }
    if (kosztSliderValue !== 0){
      new_koszt = 101-kosztSliderValue;
    }



    if(num === 1){
        setCenaSliderValue(newValue);
        setWeights({["cena"]:new_value, ["przebieg"]:new_przebieg, ["klimatyzacja"]:new_klimatyzacja, ["sredni_koszt_naprawy"]:new_koszt });

    }else{
        if(num === 2){
            setPrzebiegSliderValue(newValue);
            setWeights({["cena"]:new_cena, ["przebieg"]:new_value, ["klimatyzacja"]:new_klimatyzacja, ["sredni_koszt_naprawy"]:new_koszt });

        }else{
            if(num === 3){
              setKlimatyzacjaSliderValue(newValue);
              setWeights({["cena"]:new_cena, ["przebieg"]:new_przebieg, ["klimatyzacja"]:new_value, ["sredni_koszt_naprawy"]:new_koszt });
            }else{
              setKosztSliderValue(newValue);
              setWeights({["cena"]:new_cena, ["przebieg"]:new_przebieg, ["klimatyzacja"]:new_klimatyzacja, ["sredni_koszt_naprawy"]:new_value });
        }
    }
    
  }};

  const fetchWeights = () =>{
    fetch(`http://localhost:3040/weight`)
    .then((response) => response.json())
      .then((data) => {
        setSorted(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }






  useEffect(() => {
    document.title = 'REACT RISK CALCULATOR';
    refreashData();
    refreashProducers();
    fetchWeights();
    UpdateCharts(1);
  }, []);

  useEffect(() => {
    UpdateCharts(1);
  }, [cars]);


  return (
    <>
      <Header 
      fetchDataAndUpdateCharts={UpdateCharts}
      handleSliderChange={handleSliderChange}
      csV = {cenaSliderValue}
      psV = {przebiegSliderValue}
      klsV = {klimatyzacjaSliderValue}
      kosV = {kosztSliderValue}
      
      scsV = {setCenaSliderValue}
      spsV = {setPrzebiegSliderValue}
      sklsV = {setKlimatyzacjaSliderValue}
      skosV = {setKosztSliderValue}

      // index={true}
      tables={true}
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
                      Cars
                    </h6>
                    <h2 className="text-white mb-0">{bestCar}</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
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
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Price</span>
                          <span className="d-md-none">$</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">km</span>
                          <span className="d-md-none">km</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">AC</span>
                          <span className="d-md-none">AC</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 5,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 5)}
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
                  <Bar
                    data={barData}
                    options={chartExample2.options}
                  />
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
                      onClick={(e) => (e.preventDefault(), refreashData())}
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
                    <th scope="col" onClick={() =>(refreashData("name", isASC["name"]), toggleSortingOrder("name"))}>Car</th>
                    <th scope="col" onClick={() =>(refreashData("cena", isASC["cena"]), toggleSortingOrder("cena"))}>Price</th>
                    <th scope="col" onClick={() =>(refreashData("przebieg", isASC["przebieg"]), toggleSortingOrder("przebieg"))}>Course</th>
                    <th scope="col" onClick={() =>(refreashData("klimatyzacja", isASC["klimatyzacja"]), toggleSortingOrder("klimatyzacja"))}>AC</th>
                    <th scope="col" onClick={() =>(refreashData("sredni_koszt_naprawy", isASC["sredni_koszt_naprawy"]), toggleSortingOrder("sredni_koszt_naprawy"))}>Avg repair cost</th>
                    <th scope="col" onClick={() =>(refreashData("producer", isASC["producer"]), toggleSortingOrder("producer"))}>Producer</th>

                    
                  </tr>
                </thead>
                <tbody>
                  
                    {Array.isArray(cars) && cars.map(element =>{
                      return(
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element.name}</th>
                          <td>{element.cena}</td>
                          <td>{element.przebieg}</td>
                          <td>{element.klimatyzacja}</td>
                          <td>{element.sredni_koszt_naprawy}</td>
                          <td>{element.producer}</td>
                        </tr>
                    )})}
                    
                  
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
                    
                    {Array.isArray(producers) && producers.map(element =>{
                      return(
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element.producer}</th>
                          <td>{element.counted}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{(element.counted/producersPercentage*100).toFixed(1)}%</span>
                              <div>
                                <Progress
                                  max="100"
                                  value={(element.counted/producersPercentage*100).toFixed(1)}
                                  barClassName="bg-gradient-info"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                    )})}
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
