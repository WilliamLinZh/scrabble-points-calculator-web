import { render } from '@testing-library/react';
import { usePointCalculator } from './hooks/usePointCalculator';
import Tiles from './Tiles';

jest.mock('./hooks/usePointCalculator');
describe('OmjsAvailableTimeslots', () => {
    const mockUsePointCalculator = usePointCalculator as jest.Mocked<any>;

    it('should render correct', async () => {
        mockUsePointCalculator.mockReturnValue({
            resetTiles: jest.fn(),
            saveScore: jest.fn(),
            viewTopScores: jest.fn(),
            chars: [],
            score: [],
            open: false,
            handleClose: jest.fn(),
            notification: jest.fn(),
        });

        const { container } = render(<Tiles numberOfTiles={10} />);

        expect(container.textContent).toContain('Type Word to achieve high Score!');
    });

    it('should render correctly', async () => {
        mockUsePointCalculator.mockReturnValue({
            resetTiles: jest.fn(),
            saveScore: jest.fn(),
            viewTopScores: jest.fn(),
            chars: [],
            score: [],
            open: false,
            handleClose: jest.fn(),
            notification: jest.fn(),
        });

        const { container } = render(<Tiles numberOfTiles={10} />);

        expect(container.textContent).toContain('Type Word to achieve high Score!');
    });

    it('should render popup', async () => {
        mockUsePointCalculator.mockReturnValue({
            resetTiles: jest.fn(),
            saveScore: jest.fn(),
            viewTopScores: jest.fn(),
            chars: [],
            score: [],
            open: true,
            handleClose: jest.fn(),
            notification: {'title':'Top 10 Scores', 'message': [36,35,28,21,20,8]},
        });

        const { container } = render(<Tiles numberOfTiles={10} />);

        expect(container.textContent).toContain('Type Word to achieve high Score!');
    });
});
