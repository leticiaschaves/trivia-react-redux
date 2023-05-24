import { screen, waitFor, act } from "@testing-library/react";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('Testa página de feedback', () => {
    it('Deve renderizar os elementos da página', () => {
      renderWithRouterAndRedux(< Feedback />);
  
      const feedbackText = screen.getByTestId('feedback-text');
      const totalScore = screen.getByTestId('feedback-total-score');
      const totalQuestion = screen.getByTestId('feedback-total-question');
      const playAgainBtn = screen.getByTestId('btn-play-again');
      const rankingBtn = screen.getByTestId('btn-ranking');

    expect(feedbackText).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  });
  it('Deve redirecionar o usuário para a tela de início quando clicar no botão Play Again', () => {

    act(() => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
    })

    const playAgainBtn = screen.getByTestId('btn-play-again');

    expect(playAgainBtn).toBeInTheDocument();

    userEvent.click(playAgainBtn);

    waitFor(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    }, 5000)
  });
  it('Deve redirecionar o usuário para a tela de início quando clicar no botão Ranking', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        history.push('/feedback');

    const rankingBtn = await screen.findByTestId('btn-ranking');

    expect(rankingBtn).toBeInTheDocument();
    
    await waitFor(() => {
        userEvent.click(rankingBtn);
    }, 5000)
    
        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
  });
});
