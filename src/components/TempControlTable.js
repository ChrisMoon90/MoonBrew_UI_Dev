import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap';
import TargetTemp from './TargetTemp';
import TempTol from './TempTol';


function TempControlTable() {

    return(
        <div>
            <h4><br></br></h4>
            <h2>Temp Control Values</h2>
            <h4><br></br></h4>
            <Container fluid>
                <Row>
                    <Col>
                        <TargetTemp />
                    </Col>
                    <Col>
                        <TempTol />
                    </Col>
                </Row>
            </Container>
            <h1><br></br></h1>
        </div>
        )
}

export default TempControlTable;