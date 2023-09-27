import React, {FC, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OffCanvas, { OffCanvasBody } from '../../../../components/bootstrap/OffCanvas';
import Avatar from '../../../../components/Avatar';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import Button from '../../../../components/bootstrap/Button';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../../components/bootstrap/Card';
import Icon from '../../../../components/icon/Icon';
import useDarkMode from '../../../../hooks/useDarkMode';
import AuthContext from "../../../../contexts/authContext";
import {formatHoraMin, formatKm} from '../../../../helpers/helpers';

interface IUserAppointment {
    [key: string]: 'Aprovado' | 'Pendente' | 'Rejetada';
}
interface ICommonRightPanel {
    setOpen(...args: unknown[]): unknown;
    isOpen: boolean;
}
const CommonRightPanel: FC<ICommonRightPanel> = ({ setOpen, isOpen }) => {
    const { themeStatus, darkModeStatus } = useDarkMode();
    const { userData } = useContext(AuthContext);

    const USER_APPOINTMENT: IUserAppointment = {
        APPROVED: 'Aprovado',
        PENDING: 'Pendente',
        REJECTED: 'Rejetada',
    };
    const [activeUserAppointmentTab, setActiveUserAppointmentTab] = useState<
        IUserAppointment['key']
    >(USER_APPOINTMENT.APPROVED);
    const handleActiveUserAppointmentTab = (tabName: IUserAppointment['key']) => {
        setActiveUserAppointmentTab(tabName);
    };

    return (
        <OffCanvas setOpen={setOpen} isOpen={isOpen} isRightPanel>
            <OffCanvasBody className='p-4'>
                <div className='row mb-5'>
                    <div className='col'>
                        <div className='d-flex align-items-center'>
                            <div className='h5 mb-0 text-muted'>
                                <strong>Seu Progresso</strong>
                            </div>
                        </div>
                    </div>
                    <div className='col-auto'>
                        <Dropdown>
                            <DropdownToggle hasIcon={false}>
                                <Button
                                    icon='MoreHoriz'
                                    color={themeStatus}
                                    hoverShadow='default'
                                    isLight={darkModeStatus}
                                />
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                                <DropdownItem>
                                    <Button
                                        color='link'
                                        icon='Close'
                                        onClick={() => {
                                            setOpen(false);
                                        }}>
                                        Close
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-3'>
                    <Avatar
                        srcSet={userData.strava_profile_medium}
                        src=''
                        shadow='default'
                    />
                </div>

                <div className='d-flex flex-column align-items-center mb-5'>
                    <div className='h2 fw-bold'>{`${userData.name}`}</div>
                    <div className='h5 text-muted text-lowercase opacity-50'>{`@${userData.name}`}</div>
                </div>

                <Card className={classNames('mb-6', {
                    'text-dark': darkModeStatus,
                    'bg-l25-info': !darkModeStatus,
                    'bg-lo50-info': darkModeStatus,
                })}
                      isCompact>
                    <CardHeader className='bg-transparent'>
                        <CardLabel>
                            <CardTitle tag='h4' className='h5'>
                                Resumo
                            </CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='d-flex align-items-center pb-3'>
                            <div className='flex-shrink-0'>
                                <Icon icon='PedalBike' size='4x' color='info' />
                            </div>
                            <div className='flex-grow-1 ms-3'>
                                <div className='fw-bold fs-3 mb-0'>
                                    Distância:
                                    <span className='text-success fs-5 fw-bold ms-3'>
										{ userData.stats ? formatKm(userData.stats.distance) : 0 } Km
									</span>
                                </div>
                                <div
                                    className={classNames({
                                        'text-muted': !darkModeStatus,
                                        'text-light': darkModeStatus,
                                    })}>
                                    Movimento: { userData.stats ? formatHoraMin(userData.stats.moving_time) : 0 }
                                </div>

                                <div
                                    className={classNames({
                                        'text-muted': !darkModeStatus,
                                        'text-light': darkModeStatus,
                                    })}>
                                    Total: { userData.stats ? formatHoraMin(userData.stats.elapsed_time) : 0 }
                                </div>

                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className={classNames('rounded-3', {
                        'shadow-3d-dark': !darkModeStatus,
                        'shadow-3d-light': darkModeStatus,
                        'bg-l10-dark': !darkModeStatus,
                        'bg-lo50-info': darkModeStatus,
                    })}>
                    <div className='row row-cols-3 g-3 pb-3 px-3 mt-0'>
                        {Object.keys(USER_APPOINTMENT).map((key) => (
                            <div
                                key={USER_APPOINTMENT[key]}
                                className='col d-flex flex-column align-items-center'>
                                <Button
                                    color={
                                        (darkModeStatus &&
                                            activeUserAppointmentTab === USER_APPOINTMENT[key]) ||
                                        !darkModeStatus
                                            ? 'dark'
                                            : undefined
                                    }
                                    className='w-100 text-capitalize'
                                    rounded={1}
                                    onClick={() =>
                                        handleActiveUserAppointmentTab(USER_APPOINTMENT[key])
                                    }
                                    isLight={activeUserAppointmentTab !== USER_APPOINTMENT[key]}>
                                    <div className='h6 mb-3 text-muted opacity-80'>
                                        {USER_APPOINTMENT[key]}
                                    </div>
                                    <div
                                        className={classNames('h2', {
                                            'text-light': darkModeStatus,
                                        })}>
                                        1
                                    </div>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                 <Card>
                    <CardBody>
                        <div className='row g-3 align-items-center'>
                            <div className='col d-flex align-items-center'>
                                <div className='flex-shrink-0'>
                                    <div className='ratio ratio-1x1' style={{ width: 72 }}>
                                        <div
                                            className={classNames(
                                                'rounded-2 d-flex align-items-center justify-content-center',
                                                {
                                                    'bg-l10-info': !darkModeStatus,
                                                    'bg-lo25-info': darkModeStatus,
                                                },
                                            )}>
                                            <span className='text-info fs-1 fw-bold'>
                                                <Icon icon='DirectionsBike' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <div className='fw-bold fs-6 mb-0'>Pedal Tapejara</div>
                                        <div className='text-muted'>
                                            <small>
                                                Data:{' '}
                                                <span className='text-info fw-bold'>
                                                    12/09/2023
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div
                                    className={classNames(
                                        `text-info fw-bold px-3 py-2 rounded-pill`,
                                        {
                                            'bg-l10-info': !darkModeStatus,
                                            'bg-lo25-info': darkModeStatus,
                                        },
                                    )}>
                                    300 Pontos
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </OffCanvasBody>
        </OffCanvas>
    );
};
CommonRightPanel.propTypes = {
    setOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default CommonRightPanel;
