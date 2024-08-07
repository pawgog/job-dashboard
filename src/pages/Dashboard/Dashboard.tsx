import Board from '../DragDropBoard/Board';
import { staticText } from '../../global/staticText';
import * as S from './Dashboard.styled';

function Dashboard() {
  return (
    <S.Dashboard>
      <h2>{staticText.dashboardTitle}</h2>
      <Board />
    </S.Dashboard>
  );
}

export default Dashboard;
