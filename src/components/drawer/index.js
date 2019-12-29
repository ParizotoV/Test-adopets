import React from 'react';

import DescriptionItem from './DescriptionItem';

import { Drawer, Row, Col } from 'antd';

const CustomDrawer = ({ pet, open, handleChangeOpen }) => {

  return (
    <React.Fragment>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={handleChangeOpen}
        visible={open}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      >
        <p className='drawer_p' style={{ marginBottom: 24 }}>Pet Details</p>
        <p className='drawer_p'>Detail</p>
        <Row>
            <Col span={12}>
              <DescriptionItem title="Name:" content={pet.name}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Genre:" content={pet.sex_key}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Size:" content={pet.size_key}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Age:" content={pet.age_key}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Specie:" content={pet.specie.name}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Breed:" content={pet.breed_primary.name}/>
            </Col>
          </Row>
      </Drawer>
    </React.Fragment>
  )

}

export default CustomDrawer;