import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

enum EventName {
    RUNNING = 'running',
    START_BRAKING = 'start_braking',
    END_BRAKING = 'end_braking',
    SHOW_COIN = 'show_coin',
    GAME_START = 'game_start',
    GAME_OVER = 'game_over',
    NEW_LEVEL = 'new_level',
    SHOW_TALK = 'show_talk',
    SHOW_GUIDE = 'show_guide'
}

enum PoleCollisionName {
    COIN = 'coin',
    RAIL = 'rail'
}
enum PlayerCollisionName {
    POLE_COLLECT = 'pole_collect',
    POISON = 'poison',
    CUT = 'cut',
}

enum GameState {
    IDLE = 'idle',
    PLAYING = 'playing',
    PAUSE = 'pause',
    OVER = 'over'
}

enum PlayerState {
    IDLE = 'idle',
    JUMP = 'jump',
    HANG = 'hang',
    RUNNING = 'running',
    NONE = 'none',
    DROP_DIE = 'drop_die',
    POISON_DIE = 'poison_die',
    CUT_DIE = 'cut_die',
    WIN = 'win',
    FAIL = 'fail'

}

enum AudioSource {
    BACKGROUND = 'background',
    CLICK = 'click',
    CRASH = 'crash',
    GET_MONEY = 'getMoney',
    IN_CAR = 'inCar',
    NEW_ORDER = 'newOrder',
    START = 'start',
    STOP = 'stop',
    TOOTING1 = 'tooting1',
    TOOTING2 = 'tooting2',
    WIN = 'win'
}

enum Group {
    PLAYER = 1 << 0,
    POLE = 1 << 1,
    COIN = 1 << 2,
    PLANE = 1 << 3,
    CUT = 1 << 4,
    POLE_COLLECT = 1 << 5,
    RAIL = 1 << 6,
    POISON = 1 << 7 ,
    SECONDARY = 1 << 8,
    EEN_POINT = 1 << 9
}


@ccclass('Constants')
export class Constants extends Component {
    public static EventName = EventName;

    public static GameState = GameState;
    
    public static PlayerState = PlayerState;

    public static AudioSource = AudioSource;

    public static PoleCollisionName = PoleCollisionName;

    public static PlayerCollisionName = PlayerCollisionName;

    public static Group = Group;

    public static talkTable = [
        'Please hurry up.\n I have a plane to catch.',
        'The most beautiful dat \nis not the rainy day.'
    ];

    public static UIPage = {
        mainUI: 'mainUI',
        gameUI: 'gameUI',
        resultUI: 'resultUI'
    }
}
