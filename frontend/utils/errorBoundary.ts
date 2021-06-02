export const convertErrorToMsg = (errorCode: string) => {
    switch (errorCode) {
        case 'IncorrectSecretCode':
            return '잘못된 가입코드입니다.';
        case 'MissingParameter':
            return '모든 입력칸을 채워주세요.';
        case 'ExistingAccount':
            return '이미 존재하는 계정입니다.';
        case 'InvalidPassword':
            return '패스워드 형식이 맞지 않습니다.\n 8자~50자, 대문자 포함';
        case 'UserNotFound':
            return '존재하지 않는 계정입니다.';
        case 'PasswordNotCorrect':
            return '패스워드가 일치하지 않습니다.';
    }
};
