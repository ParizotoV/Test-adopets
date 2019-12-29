import React from 'react';

import {
  lodashGet
} from '../../utils';

import { Menu } from 'antd';

export const filterSex = ({ handleChangeFilter }) => (
  <Menu onClick={(key) => handleChangeFilter("sex_key", key.key)}>
    <Menu.Item key="ALL">
      All genders
    </Menu.Item>
    <Menu.Item key="MALE">
      Male
    </Menu.Item>
    <Menu.Item key="FEMALE">
      Famale
    </Menu.Item>
  </Menu>
)

export const filterSize = ({ handleChangeFilter }) => (
  <Menu onClick={(key) => handleChangeFilter("size_key", key.key)}>
    <Menu.Item key="ALL" >
      All genders
    </Menu.Item>
    <Menu.Item key="S">
      Small
    </Menu.Item>
    <Menu.Item key="M">
      Medium
    </Menu.Item>
    <Menu.Item key="L">
      Large
    </Menu.Item>
    <Menu.Item key="XL">
      Extra Large
    </Menu.Item>
  </Menu>
)

export const filterAge = ({ handleChangeFilter }) => (
  <Menu onClick={(key) => handleChangeFilter("age_key", key.key)} >
    <Menu.Item key="ALL">
      All genders
    </Menu.Item>
    <Menu.Item key="BABY">
      Baby
    </Menu.Item>
    <Menu.Item key="YOUNG">
      Young
    </Menu.Item>
    <Menu.Item key="ADULT">
      Adult
    </Menu.Item>
    <Menu.Item key="SENIOR">
      Senior
    </Menu.Item>
  </Menu>
)

export const filterOrder = ({ handleChangeOrder, formItem }) => {
  const fields = lodashGet(formItem, 'search._fields')
  return (
    <Menu onClick={(key) => handleChangeOrder("sort", key.key)}>
      <Menu.Item key={`${fields[3]}`}>
        ASC - NAME
      </Menu.Item>
      <Menu.Item key={`-${fields[3]}`}>
        DESC - NAME
      </Menu.Item>
    </Menu>
  )
}