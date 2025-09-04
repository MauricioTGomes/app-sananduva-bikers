import React, {useCallback, useState} from 'react';
import { FormikHelpers, useFormik } from 'formik';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import api from '../../../services/api';
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight
} from '../../../layout/SubHeader/SubHeader';
import Button from "../../../components/bootstrap/Button";
import moment from 'moment';
import Card, {CardHeader, CardLabel, CardBody, CardTitle} from "../../../components/bootstrap/Card";
import {dashboardPagesMaster} from "../../../menu";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import Page from "../../../layout/Page/Page";
import Breadcrumb from "../../../components/bootstrap/Breadcrumb";
import showNotification from "../../../components/extras/showNotification";
import Spinner from "../../../components/bootstrap/Spinner";
import {useNavigate} from "react-router-dom";

interface IValuesForm {
    name: string;
    description: string;
    date_start: string;
    date_end: string;
    awards: any;
}
const Edit = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const formikAward = useFormik({
        onSubmit<Values>(
            values: Values,
            formikHelpers: FormikHelpers<Values>,
        ): void | Promise<any> {
            return undefined;
        },
        initialValues: {
            'description': '',
            'kms': 0,
            'sex': 'M',
            'gift': ''
        },
    });

    const formik = useFormik({
        onSubmit<IValuesForm>(
            values: IValuesForm,
            formikHelpers: FormikHelpers<IValuesForm>,
        ): void | Promise<any> {
            setIsLoading(true);
            api.post('year-edition/save', {...values}).then(resp => {
                setIsLoading(false);
                if (resp.data.error) {
                    return showNotification('Atenção!', resp.data.message, 'warning');
                }
                showNotification('Sucesso!', resp.data.message, 'success');
                return navigate('/')
            })

        },
        initialValues: {
            name: 'KM Vantagens 2023',
            description: 'Exercise Bike',
            date_start: moment().add(1, 'days').format('YYYY-MM-DD'),
            date_end: moment().add(1, 'days').format('YYYY-MM-DD'),
            awards: []
        },
    });

    const pushAward = useCallback(
        () => {
            if (formikAward.values.gift === '' || formikAward.values.kms <= 0 || formikAward.values.sex === '' || formikAward.values.description === '') {
                return showNotification('Atenção!', 'Informe todos os dados.', 'warning');
            }
            let arr = [...formik.values.awards, formikAward.values];
            formik.setFieldValue('awards', arr)
        },
        [formikAward, formik],
    );


    return (
        <PageWrapper title={dashboardPagesMaster.year.subMenu.edit.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Breadcrumb
                        list={[
                            { title: dashboardPagesMaster.year.subMenu.list.text, to: dashboardPagesMaster.year.subMenu.list.path },
                            { title: dashboardPagesMaster.year.subMenu.edit.text, to: dashboardPagesMaster.year.subMenu.edit.path },
                        ]}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        color='success'
                        isOutline
                        icon='Save'
                        isDisable={isLoading}
                        onClick={formik.handleSubmit}>
                        {isLoading && (
                            <Spinner isSmall inButton isGrow />
                        )}
                        Salvar
                    </Button>
                </SubHeaderRight>
            </SubHeader>

            <Page>
                <Card isCompact className='mb-0'>
                    <CardHeader>
                        <CardLabel icon={dashboardPagesMaster.year.icon} iconColor='success'>
                            <CardTitle>Edição</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='row g-4'>
                            <div className='col-4'>
                                <FormGroup id='name' label='Nome' isFloating>
                                    <Input
                                        placeholder='Nome'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-4'>
                                <FormGroup id='date_start' label='Date' isFloating>
                                    <Input
                                        placeholder='Date'
                                        onChange={formik.handleChange}
                                        value={formik.values.date_start}
                                        type='date'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-4'>
                                <FormGroup id='date_end' label='Date' isFloating>
                                    <Input
                                        placeholder='Date'
                                        onChange={formik.handleChange}
                                        value={formik.values.date_end}
                                        type='date'
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-12'>
                                <FormGroup id='description' label='Descrição' isFloating>
                                    <Textarea
                                        placeholder='Descrição'
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-12'>
                                <Card isCompact className='mb-0'>
                                    <CardHeader>
                                        <CardLabel icon='EmojiEvents' iconColor='success'>
                                            <CardTitle>Premiações e metas</CardTitle>
                                        </CardLabel>
                                    </CardHeader>
                                    <CardBody>
                                        <div className='row g-4'>
                                            <div className='col-4'>
                                                <FormGroup id='sex' label='Sexo' isFloating>
                                                    <Select
                                                        ariaLabel='Sexo'
                                                        placeholder='Sexo'
                                                        onChange={formikAward.handleChange}
                                                        value={formikAward.values.sex}
                                                        list={[{ value: 'M', text: 'Masc' },{ value: 'F', text: 'Fem' }]}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-4'>
                                                <FormGroup id='description' label='Descrição' isFloating>
                                                    <Input
                                                        placeholder='Descrição'
                                                        onChange={formikAward.handleChange}
                                                        value={formikAward.values.description}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-4'>
                                                <FormGroup id='kms' label='Kms / Pontos' isFloating>
                                                    <Input
                                                        placeholder='Kms / Pontos'
                                                        onChange={formikAward.handleChange}
                                                        value={formikAward.values.kms}
                                                        type='number'
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-4'>
                                                <FormGroup id='gift' label='Prêmio' isFloating>
                                                    <Input
                                                        placeholder='Prêmio'
                                                        onChange={formikAward.handleChange}
                                                        value={formikAward.values.gift}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-4'>
                                                <Button color='success' icon='ExposurePlus1'
                                                        onClick={ pushAward }>
                                                    Adicionar
                                                </Button>
                                            </div>

                                            <div className='col-12'>
                                                <table className='table table-modern table-hover'>
                                                    <thead>
                                                    <tr>
                                                        <th scope='col'>Descrição</th>
                                                        <th scope='col'>Sexo</th>
                                                        <th scope='col'>KMs</th>
                                                        <th scope='col'>Prêmio</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {formik.values.awards.map((i: any, key: number) => (
                                                        <tr key={key}>
                                                            <th scope='row'>{i.description}</th>
                                                            <th scope='row'>{i.sex == 'M' ? 'Masc' : 'Fem'}</th>
                                                            <th scope='row'>{i.kms}</th>
                                                            <th scope='row'>{i.gift}</th>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Edit;
