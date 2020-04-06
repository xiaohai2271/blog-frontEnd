import {environment} from '../../environments/environment';

export class EditorConfig {
    public width = '100%';
    public height = '400';
    public path = 'assets/editor/lib/';
    public codeFold: true;
    public searchReplace = true;
    public toolbar = true;
    public placeholder = '欢迎来到小海的创作中心';
    public emoji = true;
    public taskList = true;
    public tex = true;
    public readOnly = false;
    public tocm = true;
    public watch = true;
    public previewCodeHighlight = true;
    public saveHTMLToTextarea = true;
    public markdown = '';
    public flowChart = true;
    public syncScrolling = true;
    public sequenceDiagram = true;
    public imageUpload = true;
    public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
    public imageUploadURL = environment.host + '/imgUpload';

}