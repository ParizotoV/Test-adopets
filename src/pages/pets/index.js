import React, { useState, useEffect } from 'react';

import {
  lodashGet,
  lodashMap,
  lodashIsNil
} from '../../utils'
import { Redirect } from 'react-router-dom';

import { usePetsApi } from '../../api';

import { Row, Col, Dropdown, Button, Pagination, Card, Empty, Spin, Divider, Tag } from 'antd';
import { filterSex, filterSize, filterAge } from './filters';
import Drawer from '../../components/drawer';

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
    const name = lodashGet(key, 'item.props.children')
    const value = lodashGet(key, 'key')
    if (value !== 'ALL') {
      setFormItem(prev => ({ ...prev, search: { ...prev.search, [field]: value } }))
      setFilter(prev => ({ ...prev, [field]: name }))
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

  const page = lodashGet(postData, 'data.page')
  const totalPage = lodashGet(postData, 'data.pages')
  const count = lodashGet(postData, 'data.count')
  const loading = lodashGet(postData, 'loading')

  console.log(postData)

  if (lodashIsNil(localStorage.getItem('token'))) {
    return <Redirect to='/login' />
  }

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col span={18} offset={3}>
            <div style={{ padding: '10px', marginTop: '15px' }}>
              <Dropdown overlay={filterSex({ handleChangeFilter })} className='button_filter'>
                <Button>
                  {filter.sex_key !== '' ? filter.sex_key : 'All genders'}
                </Button>
              </Dropdown>
              <span style={{ marginLeft: '10px' }} />
              <Dropdown overlay={filterAge({ handleChangeFilter })} className='button_filter'>
                <Button>
                  {filter.age_key !== '' ? filter.age_key : 'All ages'}
                </Button>
              </Dropdown>
              <span style={{ marginLeft: '10px' }} />
              <Dropdown overlay={filterSize({ handleChangeFilter })} className='button_filter'>
                <Button>
                  {filter.size_key !== '' ? filter.size_key : 'All sizes'}
                </Button>
              </Dropdown>
            </div>
            <Divider />
            <div>
              <Row gutter={[16, 16]}>
                {count === 0 && !loading && <Empty />}
                {loading && (
                  <Col span={4} offset={10} style={{ textAlign: 'center' }}>
                    <Spin size='large' />
                  </Col>
                )}
                {!loading && (
                  lodashMap(listPets, pet => (
                    <Col span={6} key={pet.id}>
                      <Card className='card' onClick={handleChangeOpen}>
                        <div className='title'>{pet.name}</div>
                        <div className="content"><b>{pet.specie.name}</b> | {pet.breed_primary.name}</div>
                        <div>
                          <Tag className='tags'>{pet.sex_key}</Tag>
                          <Tag className='tags'>{pet.size_key}</Tag>
                          <Tag className='tags'>{pet.age_key}</Tag>
                        </div>
                        <Drawer pet={pet} open={open} handleChangeOpen={handleChangeOpen} />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </Col>
          <Col span={4} offset={10} style={{ textAlign: 'center' }}>
            {count > 0 && !loading && <Pagination size='small' current={page} total={totalPage * 10} onChange={(page) => handleChangePage(page)} />}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )

}

export default Pets;