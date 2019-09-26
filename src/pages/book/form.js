import React, { Component } from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {  AXIOS } from '../../config'


export class FormBook extends Component {
    book = {
        icbn: '',
        name: '',
        year_publication: 0,
        category_data: '',
        editorial: '',
        date_publication: '',
        authors: []
    }

    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    async componentDidMount() {
        this.getCategories()
    }

    async getCategories() {
        try{
            const categories = await AXIOS.get('categorys')
            this.setState({
                categories: categories.data
            })
        }catch(Exception){
            console.log(Exception);
        }
    }

    optionsCategory(){
        return !this.state.categories ? <option value="">No hay categorias disponibles</option> :
        this.state.categories.map((category, id) => (
            <option value={category._id} key={id}>{category.name}</option>
        ))
    }

    saveBook = (values) => {
        console.log(values);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <div className="page-title-box">
                            <Row>
                                <Col lg={7}>
                                    <h4 className="page-title">Book create</h4>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <Formik
                                    initialValues={this.book}
                                    onSubmit={(values, { setSubmitting }) => {
                                        this.saveBook(values);
                                        setSubmitting(false);
                                    }}
                                    validationSchema={Yup.object().shape({
                                        icbn: Yup.string().required('This field is required'),
                                        name: Yup.string().required('This field is required'),
                                    })}
                                >
                                    {props => {
                                        const {
                                            values,
                                            touched,
                                            errors,
                                            dirty,
                                            isSubmitting,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            handleReset,
                                        } = props;
                                        return (
                                            <Form onSubmit={handleSubmit}>
                                                <FormGroup row>
                                                    <Col md={6}>
                                                        <Label for="id_icbn">ICBN</Label>
                                                        <Input 
                                                            type="text" 
                                                            name="icbn" 
                                                            id="id_icbn"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.icbn}
                                                            className={
                                                                errors.icbn && touched.icbn ? 'is-invalid' : 'text-input'
                                                            }
                                                        />
                                                        {errors.icbn && touched.icbn && (
                                                            <div className="invalid-feedback">{errors.icbn}</div>
                                                        )}
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label for="id_name">Name</Label>
                                                        <Input 
                                                            type="text" 
                                                            name="name" 
                                                            id="id_name"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.name}
                                                            className={
                                                                errors.name && touched.name ? 'is-invalid' : 'text-input'
                                                            }
                                                        />
                                                        {errors.name && touched.name && (
                                                            <div className="invalid-feedback">{errors.name}</div>
                                                        )}
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={6}>
                                                        <Label for="id_year_publication">Year Publication</Label>
                                                        <Input 
                                                            type="text" 
                                                            id="id_year_publication"
                                                            value={values.year_publication}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label for="id_category">Category</Label>
                                                        <Input 
                                                            type="select" 
                                                            name="category_data"
                                                            id="id_category" 
                                                            value={ values.category_data }
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}                                                                                                                        
                                                        >
                                                            <option value="" label="Select a category" />
                                                            { this.optionsCategory() }
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={6}>
                                                        <Label for="id_editorial">Editorial</Label>
                                                        <Input 
                                                            type="text" 
                                                            name="editorial" 
                                                            id="id_editorial"
                                                            value={values.editorial}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label for="id_date_publication">Date publication</Label>
                                                        <Input 
                                                            type="date" 
                                                            name="date_publication" 
                                                            id="id_date_publication"
                                                            value={values.date_publication}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={12} className="text-center">
                                                        <Button color="primary">Add Author</Button>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={4}>
                                                        <Label>Name</Label>
                                                        <Input 
                                                            type="text"
                                                            name="name"
                                                            id="name_author"
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Label>BirthDate</Label>
                                                        <Input 
                                                            type="date"
                                                            name="birthdate"
                                                            id="birthdate"
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Label>Nationality</Label>
                                                        <Input 
                                                            type="text"
                                                            name="nationality"
                                                            id="nationality"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md={12}>
                                                        <Button type="submit" className="float-right" color="success" disabled={isSubmitting}>Save Book</Button>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default FormBook

