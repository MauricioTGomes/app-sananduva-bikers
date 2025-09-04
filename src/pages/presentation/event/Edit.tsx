import React, {useEffect, useState} from 'react';
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
    const [editions, setEditions] = useState<any>([]);
    const navigate = useNavigate();

    const formik = useFormik({
        onSubmit<IValuesForm>(
            values: IValuesForm,
            formikHelpers: FormikHelpers<IValuesForm>,
        ): void | Promise<any> {
            setIsLoading(true);
            api.post('event/save', {...values}).then(resp => {
                setIsLoading(false);
                if (resp.data.error) {
                    return showNotification('Atenção!', resp.data.message, 'warning');
                }
                showNotification('Sucesso!', resp.data.message, 'success');
                return navigate('/');
            })

        },
        initialValues: {
            'year_edition_id': '',
            'name': '',
            'description': '',
            'date': moment().add(1, 'days').format('YYYY-MM-DD'),
            'points': 0,
            'points_companion': 0
        }
    });

    useEffect(() => {
        api.get('event/getEditions').then(resp => setEditions(resp.data))
    }, []);


    return (
        <PageWrapper title={dashboardPagesMaster.event.subMenu.edit.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Breadcrumb
                        list={[
                            { title: dashboardPagesMaster.event.subMenu.list.text, to: dashboardPagesMaster.event.subMenu.list.path },
                            { title: dashboardPagesMaster.event.subMenu.edit.text, to: dashboardPagesMaster.event.subMenu.edit.path },
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
                        <CardLabel icon={dashboardPagesMaster.event.icon} iconColor='success'>
                            <CardTitle>Evento</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='row g-4'>
                            <div className='col-6'>
                                <FormGroup id='year_edition_id' label='Edição' isFloating>
                                    <Select
                                        ariaLabel='Edição'
                                        placeholder='Edição'
                                        onChange={formik.handleChange}
                                        value={formik.values.year_edition_id}
                                        list={editions}
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup id='name' label='Nome' isFloating>
                                    <Input
                                        placeholder='Nome'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup id='date' label='Date' isFloating>
                                    <Input
                                        placeholder='Date'
                                        onChange={formik.handleChange}
                                        value={formik.values.date}
                                        type='date'
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup id='points' label='Pontos' isFloating>
                                    <Input
                                        placeholder='Pontos'
                                        onChange={formik.handleChange}
                                        value={formik.values.points}
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup id='points_companion' label='Pontos Acompanhante' isFloating>
                                    <Input
                                        placeholder='Pontos Acompanhante'
                                        onChange={formik.handleChange}
                                        value={formik.values.points_companion}
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-12'>
                                <FormGroup id='description' label='Descrição' isFloating>
                                    <Textarea
                                        placeholder='Descrição, Link de Inscrição e Informações'
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        rows={4}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Edit;
