import Board from '../DragDropBoard/Board';
import * as S from './Dashboard.styled';

function Dashboard() {
  return (
    <S.Dashboard>
      <h1>Job planner</h1>
      <h4>Application Process</h4>
      <Board />
    </S.Dashboard>
  );
}

export default Dashboard;
