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

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Generic_Tables = (props) => {


  
  const [isTablesVisible, setIsTablesVisible] = useState(true);
  const [currentAction, setCurrentAction] = useState("Filtering data ");
  const [newData, setNewData] = useState([]);


  const handleChange = (event) =>{
    let {name, value} = event.target;
      setNewData({ ...newData, ["ID"]:0, [name]:value });
  }


  const handleSwitchButton = () =>{
    const question = currentAction === "Filtering data ";
    setCurrentAction(question ? "Adding data ": "Filtering data ");
    setIsTablesVisible(!question);
    document.title = document.title === 'Filtering data' ? 'Adding data': 'Filtering data';
  }

 
  return (
    <>
    <Header/>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
          {isTablesVisible ? <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{"Data matching your requirements: " + props.generic_tableValues.length}
                  <div style={{float:"right"}}>
                    {currentAction}
                    <Button onClick={handleSwitchButton} color="primary">change Action</Button>
                  </div>
                </h3>
              </CardHeader>
              <div>
              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  <tr>

                    {console.log(props.generic_tableValues)}
                    {console.log(props.generic_table)}
                    {props.generic_table.map(element=>{
                      return(<th scope="col">
                        {element.name}
                      </th>)
                    })}

                  
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(props.generic_tableValues) && props.generic_tableValues.length > 0 ? props.generic_tableValues.map(element =>{
                      return(
                        <tr>
                          {Object.keys(props.generic_tableValues[0]).map(key=>{
                            console.log(element)
                            return(<td>{element[key]}</td>)
                          })}
                        </tr>
                    )}):<th colSpan={7}>There is no data that matches your requirements</th>}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
              </div>
              </Card>
          :<Card className="shadow">
              
              <CardHeader className="border-0">
              
              <h3 className="mb-0">
                <div style={{float:"right"}} className="mb-0">
                  {currentAction}
                    <Button onClick={handleSwitchButton} color="primary">change Action</Button>
                  </div>
                </h3>
              </CardHeader>
               
               <Table
                className="align-items-center table-flush"
                responsive
                
              >
                <thead className="thead-light">
                <tr>
                    <th scope="col">index</th><th>value</th>
                  </tr>
                </thead>

                <tbody>

                  {props.generic_table.map((element, index)=>{
                    return(
                      <tr key={index}>
                        <th>
                          <label htmlFor={"label" + element.name}>{element.name}</label>
                        </th>
                        <th>
                          {element.type === "checkbox" && <Input type={element.type}  onChange={handleChange} />}
                          {element.type === "text" && <Input type={element.type} id={"label" + element.name} name={"label" + element.name} value={newData.name} onChange={handleChange}/>}
                          {element.type === "number" && element.name !== "ID" && <Input min={0} type={element.type}  id={"label" + element.name} name={"label" + element.name} value={newData.name} onChange={handleChange}/>}
                          {element.name === "ID" && <span>{index}</span>}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3} style={{textAlign:"center"}}>
                      <Button color="primary" onClick={()=>props.setGeneric_tableValues(Array.from(props.generic_tableValues).concat(newData))}>Wyślij</Button>
                    </th>
                  </tr>
                </tfoot>
              </Table>



            </Card>}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Generic_Tables;
