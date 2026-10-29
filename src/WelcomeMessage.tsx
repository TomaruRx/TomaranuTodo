import React from "react";

// コンポーネントに渡す引数 (Props) の型を定義する
// 型には Props という名前を付けることがよくあります。
type Props = {
    userName: string;
    uncompletedCount: number;
};

// WelcomeMessage という関数コンポーネントを定義する
// コンポーネントの名前はパスカルケースで記述する
    const WelcomeMessage = (props: Props) => {
    // JSX を返す前に、通常の TypeScript の処理を記述できる
    const currentTime = new Date();
    const greeting =
        currentTime.getHours() < 12 ? "おはようございます" : "こんにちは";

    // 【重要】JSX を使って UI を記述し、return で返す
    return (
        <div className="text-orange-700">
        {greeting}、{props.userName}さん。
        現在の未完了タスクは{props.uncompletedCount}個です。
        </div>
    );
};

// 他のファイルから WelcomeMessage を import できるようにする
export default WelcomeMessage;

