// import App from "../../App";
import Ranking from "../../pages/Ranking";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";

describe('testa página do ranking', () => {
    it('testa os componentes', () => {
        renderWithRouterAndRedux(Ranking)
        const goHome = screen.getByTestId('btn-go-home');
        expect(goHome).toBeInTheDocument();
        user.eventClick(goHome);
    })
    it('testa se o usuario é redirecionado a tela de inicio no clique', () => {
        const { history } = renderWithRouterAndRedux(Ranking)
        const goHome = screen.getByTestId('btn-go-home');
        expect(goHome).toBeInTheDocument();
        user.eventClick(goHome);
        expect(history.location.pathname).toBe('/');
    })
    it('testa os dados do jogador', () => {
        expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
        expect(screen.getByTestId('player-name-0')).toBeInTheDocument();
        expect(screen.getByTestId('player-score-0')).toBeInTheDocument();
        expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
    })
});