import './style.css'
import { addActionListener } from './actionCapture'
import { startGame, mountRestartButton } from './gameCore'

mountRestartButton()
addActionListener()
startGame()