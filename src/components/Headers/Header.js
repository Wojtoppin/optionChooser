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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Slider from '@mui/material/Slider';

const Header = (props) => {

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {props.index && <Row>
              
              
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Price
                        </CardTitle>

                        <Slider
                          style={{ width: "15vw" }}
                          min={props.priceMin}
                          max={props.priceMax}
                          step={100}
                          value={props.priceRange}
                          onChange={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 1)}
                          onChangeCommitted={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 1)}
                          disableSwap
                        />
                      </div>

                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span className=" mr-2">
                         {props.priceRange[0] + "$ - " + props.priceRange[1]}$
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Course
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">


                          <Slider
                            style={{ width: "15vw" }}

                            min={props.courseMin}
                            max={props.courseMax}
                            step={100}
                            value={props.courseRange}
                            onChange={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 2)}
                            onChangeCommitted={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 2)}
                            disableSwap
                          />

                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-world" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* {"Cars: "} */}
                      <span className="mr-2">
                         {props.courseRange[0] + "km - " + props.courseRange[1]}km
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              
              
              
              
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Average repair cost
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        <Slider
                            style={{ width: "15vw" }}
                            min={props.repairMin}
                            max={props.repairMax}
                            step={10}
                            value={props.repairRange}
                            onChange={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 3)}
                            onChangeCommitted={(event, newValue, activeThumb) => props.handleNewSliderChange(event, newValue, activeThumb, 3)}
                            disableSwap
                          />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-settings" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                      <span className=" mr-2">
                         {props.repairRange[0] + "$ - " + props.repairRange[1]}$
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>}



            {props.generic_index && <Row>
                  <Col lg="6" xl="12">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <table border={0} style={{textAlign:"center", width:"100%"}}>
                          <tr>
                            <th style={{width:"33%"}} onClick={()=>props.handleChangeCurrentAction(1)}>
                              <div className="icon icon-shape text-white rounded-circle shadow" style={{background:props.isSelectPropertiesVisible || props.isChartVisible || props.isSelectObjectsVisible ?"#12980f":"#f5365c"}}>
                                <span>1</span>
                              </div>
                              {"  Select properties"}
                            </th>
                            <th style={{width:"33%"}} onClick={()=>props.handleChangeCurrentAction(2)}>
                              <div className="icon icon-shape text-white rounded-circle shadow" style={{background:props.isSelectObjectsVisible || props.isChartVisible?"#12980f":"#f5365c"}}>
                                <span>2</span>
                              </div>
                              {"  Select objects"}
                            </th>
                            <th style={{width:"33%"}} onClick={()=>props.handleChangeCurrentAction(3)}>
                              <div className="icon icon-shape text-white rounded-circle shadow" style={{background:props.isChartVisible?"#12980f":"#f5365c"}} >
                                <span>3</span>
                              </div>
                              {"  Chart"}
                            </th>
                          </tr>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                

            </Row>}

          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
