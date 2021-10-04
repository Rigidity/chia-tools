import { Client } from './Client';
import { Response } from './Response';

export interface GetPlots {
    plots: {
        filename: string;
        size: number;
        /**
         * @deprecated Use plot_id instead.
         */
        'plot-seed': string;
        plot_id: string;
        pool_public_key: string;
        pool_contract_puzzle_hash: string;
        plot_public_key: string;
        file_size: number;
        time_modified: number;
    }[];
    failed_to_open_filenames: string[];
    not_found_filenames: string[];
}

export interface RefreshPlots {}

export interface DeletePlot {}

export interface AddPlotDirectory {}

export interface GetPlotDirectories {
    directories: string[];
}

export interface RemovePlotDirectory {}

export class Harvester extends Client {
    public async getPlots(): Promise<Response<GetPlots>> {
        return await this.request<GetPlots>('get_plots', {});
    }

    public async refreshPlots(): Promise<Response<RefreshPlots>> {
        return await this.request<RefreshPlots>('refresh_plots', {});
    }

    public async deletePlot(file: string): Promise<Response<DeletePlot>> {
        return await this.request<DeletePlot>('delete_plot', {
            filename: file,
        });
    }

    public async addPlotDirectory(
        directory: string
    ): Promise<Response<AddPlotDirectory>> {
        return await this.request<AddPlotDirectory>('add_plot_directory', {
            dirname: directory,
        });
    }

    public async getPlotDirectories(): Promise<Response<GetPlotDirectories>> {
        return await this.request<GetPlotDirectories>(
            'get_plot_directories',
            {}
        );
    }

    public async removePlotDirectory(
        directory: string
    ): Promise<Response<RemovePlotDirectory>> {
        return await this.request<RemovePlotDirectory>(
            'remove_plot_directory',
            {
                dirname: directory,
            }
        );
    }
}
