import { Component } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  standalone: false,
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    fonts: [
      { name: 'Arial', class: 'arial' },
      { name: 'Times New Roman', class: 'times-new-roman' },
      { name: 'Georgia', class: 'georgia' },
      { name: 'Verdana', class: 'verdana' },
      { name: 'Courier New', class: 'courier-new' },
      { name: 'Trebuchet MS', class: 'trebuchet-ms' },
      { name: 'Tahoma', class: 'tahoma' },
      { name: 'Comic Sans MS', class: 'comic-sans-ms' },
      { name: 'Impact', class: 'impact' },
      { name: 'Garamond', class: 'garamond' },
      { name: 'Palatino Linotype', class: 'palatino-linotype' },
      { name: 'Helvetica', class: 'helvetica' },
      { name: 'Franklin Gothic Medium', class: 'franklin-gothic-medium' },
      { name: 'Baskerville', class: 'baskerville' },
      { name: 'Roboto', class: 'roboto' },
      { name: 'Open Sans', class: 'open-sans' },
      { name: 'Lato', class: 'lato' },
      { name: 'Montserrat', class: 'montserrat' },
      { name: 'Poppins', class: 'poppins' },
      { name: 'Raleway', class: 'raleway' },
      { name: 'Source Sans Pro', class: 'source-sans-pro' },
      { name: 'Nunito', class: 'nunito' },
      { name: 'Merriweather', class: 'merriweather' },
      { name: 'Quicksand', class: 'quicksand' },
      { name: 'Ubuntu', class: 'ubuntu' },
      { name: 'Playfair Display', class: 'playfair-display' },
      { name: 'Oswald', class: 'oswald' },
      { name: 'PT Sans', class: 'pt-sans' }
    ]


  };
  HtmlContent='';
}
