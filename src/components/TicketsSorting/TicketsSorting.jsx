import { selectOrder, setOrder } from '../../features/tickets.js';
import { Flex, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './TicketsSorting.css';

export default function TicketsSorting() {
  const dispatch = useDispatch();

  const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
  };

  return (
    <Radio.Group
      className="sorting"
      defaultValue={useSelector(selectOrder)}
      buttonStyle="solid"
      onChange={handleOrderChange}
    >
      <Radio.Button className="sorting-element" value="a">
        Самый дешевый
      </Radio.Button>
      <Radio.Button className="sorting-element" value="b">
        Самый быстрый
      </Radio.Button>
      <Radio.Button className="sorting-element" value="c">
        Оптимальный
      </Radio.Button>
    </Radio.Group>
  );
}
