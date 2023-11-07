import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './Tiles.module.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

import { usePointCalculator } from './hooks/usePointCalculator';

export interface TilesComponentProps {
    numberOfTiles: number;
}

const Tiles = (props: TilesComponentProps) => {
    const {
        resetTiles,
        saveScore,
        viewTopScores,
        chars,
        score,
        open,
        handleClose,
        notification,
    } = usePointCalculator();
    
    return (
        <>
            <div className={styles.text}>
                Type Word to achieve high Score!
            </div>
            <div className={styles.board}>
                {
                    chars.concat(Array(10 - chars.length).fill(' ')).map((char, i) => (
                        <span key={`${char}_${i}`} className={styles.square_bg}>{char}</span>
                    ))
                }
            </div>

            <div className={styles.text}>
                Score: {score}
            </div>

            <div className={styles.button_group}>
                <button className={styles.button}
                    type='button'
                    onClick={resetTiles}>
                    Reset Tiles
                </button>
                <button className={styles.button}
                    type='button'
                    onClick={saveScore}>
                    Save Score
                </button>
                <button className={styles.button}
                    type='button'
                    onClick={viewTopScores}>
                    View Top Scores
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {notification.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.board}>
                            {notification.message?.concat(Array(props.numberOfTiles - notification.message.length).fill(' ')).map((char, i) => (
                            <span key={`${char}_${i}`} className={styles.square_bg}>{char}</span>
                            ))}
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default Tiles;
