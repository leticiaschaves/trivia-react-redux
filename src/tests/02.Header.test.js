import { screen, act } from "@testing-library/react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from "../App";

describe('testa o header da aplicação', () => {
  it('testa a renderização dos componentes', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/game')
    })
    const score = screen.getByTestId('header-score');
    const playerName = screen.getByTestId('header-player-name');
    const profilePicture = screen.getByTestId('header-profile-picture');
    expect(score).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(profilePicture).toBeInTheDocument();
  });
});
