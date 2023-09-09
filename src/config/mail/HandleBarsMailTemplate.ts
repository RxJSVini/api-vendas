import handlebars from 'handlebars';
import { readFile } from '@shared/utils/read-file';
interface ITemplateVariable {
	[key: string ] : string | number; 
}

interface IParseMailtemplate {
	file:string;
	variables:ITemplateVariable;
}



export class HandlebarsMailTemplate {
	public async parse({ file , variables}:IParseMailtemplate ):Promise<string>{

		const templateFileContent = await readFile(
			file,
			{encoding: 'utf-8'}	
		);
		const parseTemplate = handlebars.compile(templateFileContent);

		return parseTemplate(variables);
	}
}
