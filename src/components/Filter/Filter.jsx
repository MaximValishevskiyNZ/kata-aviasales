import React, { useEffect, useState } from 'react';
import './Filter.css';
import { Checkbox } from 'antd';
import { selectFilters, setFilters, setOrder } from '../../features/tickets.js';
import { useDispatch, useSelector } from 'react-redux';
const CheckboxGroup = Checkbox.Group;

export default function Filter() {
  const plainOptions = [
    'Без пересадок',
    '1 пересадка',
    '2 пересадки',
    '3 пересадки',
  ];
  const defaultCheckedList = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  useEffect(() => {
    dispatch(setFilters(checkedList));
  }, [checkedList]);

  return (
    <div className="filter">
      <div className="filter__title">Количесво пересадок</div>
      <Checkbox
        className="filter__item"
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Все
      </Checkbox>
      <CheckboxGroup
        className="filter__items"
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </div>
  );
}
