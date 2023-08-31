const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;

const notifySubscribers = (eventName: EventsNamesType, payload: any) => {
    // @ts-ignore
    subscribers[eventName].forEach(subscriber => subscriber(payload));
};

const closeHandler = () => {
    notifySubscribers('status-changed', 'pending');
    setTimeout(createChannel, 2000);
};

const messageHandler = (e: MessageEvent) => {
    notifySubscribers('messages-received', JSON.parse(e.data));
};

const openHandler = () => {
    notifySubscribers('status-changed', 'ready');
};

const errorHandler = () => {
    notifySubscribers('status-changed', 'error');
    console.error('REFRESH PAGE');
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
};

const createChannel = () => {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
};

export const chatApi = {
    start: createChannel,
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        };
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    sendMessage(message: ChatMessageAPIType) {
        ws?.send(message.message);
    }
};

type EventsNamesType = 'messages-received' | 'status-changed';
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = 'pending' | 'ready' | 'error';