import React, { useState, useEffect, useCallback } from 'react';
import SubHeader, {
    SubHeaderLeft, SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card';
import { dashboardPagesMaster } from '../../../menu';
import PaginationButtons, {
    PER_COUNT,
} from '../../../components/PaginationButtons';
import Icon from '../../../components/icon/Icon';
import api from '../../../services/api';
import Button from "../../../components/bootstrap/Button";

const List = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [orderColumn, setOrderColumn] = useState<string>('date');
    const [orderBy, setOrderBy] = useState<string>('ASC');
    const [items, setItems] = useState<any>([]);

    const getListing = useCallback(() => {
        api.post(
            `event/list`,
            {
                perPage,
                currentPage,
                orderColumn,
                orderBy
            }
        ).then(resp => {
            setItems(resp.data.data);
            setTotalItems(resp.data.total);
        })
    }, [api, perPage, currentPage, orderColumn, orderBy]);

    const setOrder = (column: string) => {
        setOrderBy(orderBy === 'ASC' ? 'DESC' : 'ASC');
        setOrderColumn(column);
    }


    useEffect(() => {
        getListing();
    }, []);

    return (
        <PageWrapper title={dashboardPagesMaster.event.subMenu.list.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
                    <span>
						<strong>By</strong> Mauricio Treviso Gomes
					</span>
                </SubHeaderLeft>

                <SubHeaderRight>
                    <Button color='success' icon='ExposurePlus1' tag='a'>
                        Adicionar
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <Card stretch data-tour='list'>
                    <CardHeader>
                        <CardLabel icon={dashboardPagesMaster.event.subMenu.list.icon} iconColor='info'>
                            <CardTitle>
                                Edições{' '}
                                <small className='ms-2'>
                                    Registros: {totalItems}
                                </small>
                            </CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody className='table-responsive' isScrollable>
                        <table className='table table-modern table-hover'>
                            <thead>
                            <tr>
                                <th scope='col'
                                    onClick={() => setOrder('name')}
                                    className='cursor-pointer text-decoration-underline'>
                                    Nome
                                    <Icon
                                        size='lg'
                                        className={orderColumn === 'name' && orderBy === 'ASC' ? 'AddRoad ascending' : 'AddRoad descending'}
                                        icon='FilterList'
                                    />
                                </th>

                                <th scope='col'
                                    onClick={() => setOrder('date')}
                                    className='cursor-pointer text-decoration-underline'>
                                    Data
                                    <Icon
                                        size='lg'
                                        className={orderColumn === 'date' && orderBy === 'ASC' ? 'AddRoad ascending' : 'AddRoad descending'}
                                        icon='FilterList'
                                    />
                                </th>

                                <th scope='col'
                                    onClick={() => setOrder('points')}
                                    className='cursor-pointer text-decoration-underline'>
                                    Pontos
                                    <Icon
                                        size='lg'
                                        className={orderColumn === 'points' && orderBy === 'ASC' ? 'AddRoad ascending' : 'AddRoad descending'}
                                        icon='FilterList'
                                    />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((i: any, key: number) => (
                                <tr key={key}>
                                    <th scope='row'>{i.name}</th>
                                    <th scope='row'>{i.date_formatted}</th>
                                    <th scope='row'>{i.points}</th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardBody>
                    <PaginationButtons
                        data={items}
                        label='Registros'
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default List;
