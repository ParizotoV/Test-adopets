import React, { useState, useEffect } from 'react';
import { usePetsApi } from '../../api';
import { Redirect } from 'react-router-dom';

import {
  lodashGet,
  lodashMap
} from '../../utils'

import { Row, Col, Dropdown, Button, Pagination, Card, Tag, Typography } from 'antd';
import { filterSex, filterSize, filterAge, filterOrder } from './filters';
import Drawer from '../../components/drawer'

const { Title } = Typography;

const Pets = () => {
  const { postData, postPets } = usePetsApi('pet/search')

  const [open, setOpen] = useState(false)

  const [filter, setFilter] = useState({
    sex_key: '',
    size_key: '',
    age_key: '',

  })

  const [formItem, setFormItem] = useState({
    "search": {
      "_fields": [
        "id",
        "uuid",
        "custom_code",
        "name",
        "specie_id",
        "breed_primary_id",
        "price",
        "created_date",
        "status_key",
        "branch_id",
        "payment_model_key",
        "sex_key",
        "size_key",
        "age_key"
      ],
      "specie": {
        "with": {
          "_fields": [
            "id",
            "name"
          ]
        }
      },
      "breed_primary": {
        "with": {
          "_fields": [
            "id",
            "name"
          ]
        }
      },
      "branch": {
        "with": {
          "uuid": "ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff",
          "_fields": [
            "id",
            "uuid"
          ]
        }
      }
    },
    "options": {
      "page": 1,
      "limit": 5,
      "sort": []
    }
  });

  useEffect(() => {
    getPets()
  }, [formItem])

  const getPets = async () => {
    await postPets({
      ...formItem
    });
  }

  const handleChangeFilter = (field, key) => {
    if (key !== 'ALL') {
      setFormItem(prev => ({ ...prev, search: { ...prev.search, [field]: key } }))
      setFilter(prev => ({ ...prev, [field]: key }))
      setFormItem(prev => ({ ...prev, options: { ...prev.options, page: 1 } }))
    } else {
      let newFormItem = formItem;
      delete newFormItem.search[field];
      setFormItem(newFormItem);
      setFormItem(prev => ({ ...prev, options: { ...prev.options, page: 1 } }))
      setFilter(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleChangePage = epage => {
    setFormItem(prev => ({ ...prev, options: { ...prev.options, page: epage } }))
  }

  const handleChangeOrder = (field, key) => {
    setFormItem(prev => ({ ...prev, options: { ...prev.options, [field]: [key] } }))
  }

  const handleChangeOpen = () => {
    setOpen(prev => !prev)
  }

  const listPets = lodashGet(postData, 'data.result')

  if (localStorage.getItem('token') === null) {
    return <Redirect to='/login' />
  }

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col span={18} offset={3}>
            <div style={{ padding: '10px' }}>
              <Dropdown overlay={filterSex({ handleChangeFilter })} trigger={['click']} className='button_filter'>
                <Button>
                  {filter.sex_key !== '' ? filter.sex_key : 'All genders'}
                </Button>
              </Dropdown>
              <span style={{ marginLeft: '10px' }} />
              <Dropdown overlay={filterSize({ handleChangeFilter })} trigger={['click']} className='button_filter'>
                <Button>
                  {filter.size_key !== '' ? filter.size_key : 'All sizes'}
                </Button>
              </Dropdown>
              <span style={{ marginLeft: '10px' }} />
              <Dropdown overlay={filterAge({ handleChangeFilter })} trigger={['click']} className='button_filter'>
                <Button>
                  {filter.age_key !== '' ? filter.age_key : 'All ages'}
                </Button>
              </Dropdown>
            </div>
            <div>
              <Row gutter={[16, 16]}>
                {lodashMap(listPets, pet => (
                  <Col span={6}>
                    <Card style={{ borderRadius: '5px', height: '180px', cursor: 'pointer' }} onClick={console.log('clicked')}>
                      <div style={{ padding: '8px' }}>
                        <Title level={4}>{pet.name}</Title>
                        {pet.specie.name} | {pet.breed_primary.name}
                      </div>
                      <div style={{ display: 'inline' }}>
                        <Tag style={{ borderRadius: '15px', fontSize: '8px' }}>{pet.sex_key}</Tag>
                        <Tag style={{ borderRadius: '15px', fontSize: '8px' }}>{pet.size_key}</Tag>
                        <Tag style={{ borderRadius: '15px', fontSize: '8px' }}>{pet.age_key}</Tag>
                      </div>
                      <a onClick={handleChangeOpen}>
                        View Profile
                      </a>
                      <Drawer handleChangeOpen={handleChangeOpen} pet={pet} open={open} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col span={4} offset={10} style={{ textAlign: 'center' }}>
            <Pagination size="small" current={postData.data.page} total={postData.data.pages * 10} onChange={(key) => handleChangePage(key)} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )

}

export default Pets;