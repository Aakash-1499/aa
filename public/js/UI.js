import * as constants from "./constants.js";
import * as elements from "./elements.js";



export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
    const localVideo = document.getElementById("local_video");
    localVideo.srcObject = stream;

    localVideo.addEventListener("loadedmetadata", () => {
        localVideo.play();
    });
};

export const updateRemoteVideo = (stream) => {
    
    let videoContainer = document.querySelector(".videos_container");
    const remoteVideo = document.createElement("video");
    remoteVideo.srcObject = stream;
    remoteVideo.className ="remote_video";
    // remoteVideo.classList.add("display_none");
    videoContainer.appendChild(remoteVideo);
    remoteVideo.play();
    
};

export const showIncomingCallDialog = (
    callType,
    acceptCallHandler,
    rejectCallHandler
) => {
    const callTypeInfo =
        callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
    const incomingCallDialog = elements.getIncomingCallDialog(
        callTypeInfo,
        acceptCallHandler,
        rejectCallHandler   
    );


    // removing all dialogs inside HTML dialog element
    const dialog = document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

    dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
    const callingDialog = elements.getCallingDialog(rejectCallHandler);

    // removing all dialogs inside HTML dialog element
    const dialog = document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

    dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
    let infoDialog = null;

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
        infoDialog = elements.getInfoDialog(
            "REJECTED",
            "Your call has been rejected",
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        infoDialog = elements.getInfoDialog(
            "INVALID ID",
            "Callee not found ,please check personal code",
        );
    }

    // if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    //     infoDialog = elements.getInfoDialog(
    //         "Call is not possible",
    //         "Probably callee is busy. Please try againg later"
    //     );
    // }

    if (infoDialog) {
        const dialog = document.getElementById("dialog");
        dialog.appendChild(infoDialog);

        setTimeout(() => {
            removeAllDialogs();
        }, [5000]);
    }
};

export const removeAllDialogs = () => {
    const dialog = document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};


export const showCallElements = (callType) => {
    if (callType === constants.callType.CHAT_PERSONAL_CODE) {
        showChatCallElements();
    }

    if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
        showVideoCallElements();
    }
};


const showChatCallElements = () => {
    const finishConnectionChatButtonContainer = document.getElementById(
        "finish_chat_button_container"
    );
    showElement(finishConnectionChatButtonContainer);

    const newMessageInput = document.getElementById("new_message");
    showElement(newMessageInput);
    //block panel
    disablecodearea();
};

const showVideoCallElements = () => {
    const callButtons = document.getElementById("call_buttons");
    showElement(callButtons);

    // const placeholder = document.getElementById("video_placeholder");
    // hideElement(placeholder);

    const remoteVideo = document.getElementById("remote_video");
    showElement(remoteVideo);

    const newMessageInput = document.getElementById("new_message");
    showElement(newMessageInput);
    //block panel
    disablecodearea();
};





// UI functions disabling and enabling


const enablecodearea = () => {
    const codearea = document.getElementById("enter_code");
    if (codearea.classList.contains("display_none")) {
        codearea.classList.remove("display_none");
    }
};

const disablecodearea = () => {
    const codearea = document.getElementById("enter_code");
    if (!codearea.classList.contains("display_none")) {
        codearea.classList.add("display_none");
    };
};

const hideElement = (element) => {
    if (!element.classList.contains("display_none")) {
        element.classList.add("display_none");
    }
};

const showElement = (element) => {
    if (element.classList.contains("display_none")) {
        element.classList.remove("display_none");
    }
};